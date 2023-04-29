import React, { useEffect, useState } from 'react'
import { Platform, TextInput, StyleSheet, Text, View, FlatList, PermissionsAndroid,ActivityIndicator,TouchableOpacity } from 'react-native';
import Contacts from 'react-native-contacts';
import Contact from './Contact';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/utils';
import { filter } from 'lodash'
import { Button } from 'react-native-paper';
import FontAwesomIcon from 'react-native-vector-icons/FontAwesome5';
import CommonStyles from '../../assets/Styles/CommonStyles';

export default function ContactGet() {
    const navigation = useNavigation();
    const [contactData, setContactData] = useState([])
    const [searchQuery, setsearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [fullData, setFullData] = useState([])

    useEffect(() => {
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: 'Access Contacts',
                message: 'App Want to View your Phone Contacts.',
            }).then(() => {
                accessContacts();
            }
            );
        } else {
            accessContacts();
        }
    }, []);
    useEffect(() => {
        navigation.setOptions({
            headerLargeTitle: true,
            headerTitle: "Contacts",
            headerLeft: () => (
                <TouchableOpacity style={[CommonStyles.mr10]} onPress={() => navigation.goBack()}>

                <FontAwesomIcon name="arrow-left" color={Colors.white} size={20} />
                </TouchableOpacity>
              ),
            headerSearchBarOptions: {
                placeholder: "Search",
                onChangeText:(event) => {handleSearch(event.nativeEvent.text)}
            }
        })
    }, [navigation])
    const accessContacts = () => {
        setIsLoading(true)
        Contacts.getAll()
            .then((contacts) => {
                console.warn('gettttt', contacts);
                setContactData(contacts)
                setFullData(contacts)
                setIsLoading(false)
                // work with contacts
            })
            .catch((e) => { //handle error })
                setError(e)
                setIsLoading(false)
            })
    }
    const keyExtractor = (item, idx) => {
        console.log('ite,m', item);
        return item?.recordID?.toString() || idx.toString();
    };
    const renderItem = ({ item, index }) => {
        return <Contact contact={item} />;
    };
    const handleSearch = (query) => {
        console.log('query', query);
        if(query){
            setsearchQuery(query)
            const formittedQuery = query.toLowerCase();
            const filteredData = filter(fullData, (user) => {
                return contains(user, formittedQuery);
            })
            setContactData(filteredData)
        }
    }

    const contains = ({ displayName, givenName, familyName, phoneNumbers }, query) => {
        console.log('90000dat', phoneNumbers);

        const numbermatch = phoneNumbers.map((list) => {
            if (list?.number == query) {
                return true
            }
            else {
                return false
            }
        })

        if (givenName?.toLowerCase()?.includes(query) || displayName?.toLowerCase()?.includes(query) ||
            familyName?.toLowerCase()?.includes(query) || phoneNumbers[0]?.number.includes(query)) {
            return true
        }
        else {
            return false
        }

    }

    if (isLoading) {
        return (
            <View style={styles.loaderView}>
                <ActivityIndicator size={'large'} color={Colors.primary} />
            </View>
        )
    }
    if (error) {
        return (
            <View style={styles.loaderView}>
                <Text>{"Error in fetching data... Please check your internet connection!"}</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* <TextInput
                style={[styles.searchBox]}
                placeholder='Search'
                clearButtonMode="always"
                placeholderTextColor={Colors.gray}
                clearTextOnFocus={true}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(query) => handleSearch(query)}
            /> */}
            <FlatList
                data={contactData}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
    },
    searchBox: {
        paddingHorizontal: WINDOW_WIDTH * 0.051,
        paddingVertical: WINDOW_HEIGHT * 0.01,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        color: Colors.black,
        marginTop: WINDOW_HEIGHT * 0.01
    },
    loaderView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
