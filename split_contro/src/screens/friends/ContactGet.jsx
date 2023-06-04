import React, { useEffect, useState } from 'react'
import { Platform, TextInput, StyleSheet, Text, View, ScrollView, FlatList, PermissionsAndroid, ActivityIndicator, TouchableOpacity } from 'react-native';
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
import { ContactContext } from '../../context/ContactContext';
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../../store/slice/ExpenseDetailSlice';
import Entypo from 'react-native-vector-icons/Entypo';
import FlexStyles from '../../assets/Styles/FlexStyles';
const allContact = [
    {
        "phoneNumbers": [
            {
                "id": "118",
                "label": "mobile",
                "number": "+91 80972 52362"
            },
            {
                "id": "3309",
                "label": "mobile",
                "number": "+918097252362"
            },
            {
                "id": "3661",
                "label": "mobile",
                "number": "+91 80972 52362"
            },
            {
                "id": "3666",
                "label": "mobile",
                "number": "+91 80972 52362"
            }
        ],
       
        "displayName": "Basha Bhai",
        "recordID": "754"
    },
    {
        "phoneNumbers": [
            {
                "id": "123",
                "label": "mobile",
                "number": "+91 72080 15929"
            },
            {
                "id": "3564",
                "label": "mobile",
                "number": "+917208015929"
            }
        ],
      
        "recordID": "735",
        "displayName": "Shubhangi",

    },
    {
        "phoneNumbers": [
            {
                "id": "123",
                "label": "mobile",
                "number": "+91 72080 15929"
            },
            {
                "id": "3564",
                "label": "mobile",
                "number": "+917208015927"
            }
        ],
      
        "recordID": "735",
        "displayName": "rancho",

    }
]
export default function ContactGet() {
    const navigation = useNavigation();
    const [contactData, setContactData] = useState([])
    const [searchQuery, setsearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [fullData, setFullData] = useState([])
    const [selectedData, setSelectedData] = useState([])
    const dispatch = useDispatch()
    const expenseCTX = useSelector((state) => state.expense);
    console.log('expenseCTXaaa', expenseCTX);

    async function hasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.READ_CONTACTS;
        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
            return true;
        }
        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
    }

    const loadContacts = async () => {
        let contactsaray=[]
        if (await hasAndroidPermission()) {
            Contacts.getAll().then(contacts => {
                contacts?.map((list, i) => {
                    contactsaray.push({
                        displayName: list?.displayName,
                        phoneNumbers: list?.phoneNumbers,
                        recordID: list?.recordID,
                        familyName: list?.familyName
                    })
                })
                let newdata=JSON.stringify(contactsaray)
                let allContacts = JSON.parse(newdata);

                console.log('contactsaray11',newdata);
                console.log('contactsaray',allContacts);

                setContactData(allContacts)
            })
        }
        return
    };

    useEffect(() => {
        hasAndroidPermission()
    }, [])

    useEffect(() => {
        loadContacts()
    }, [hasAndroidPermission])
    
    useEffect(() => {
        navigation.setOptions({
            headerLargeTitle: true,
            headerTitle: "Contacts",
            headerLeft: () => (
                <TouchableOpacity style={[CommonStyles.mr20]} onPress={() => navigation.goBack()}>
                    <FontAwesomIcon name="arrow-left" color={Colors.white} size={20} />
                </TouchableOpacity>
            ),
            headerSearchBarOptions: {
                placeholder: "Enter name",
                onChangeText: (event) => { handleSearch(event.nativeEvent.text) }
            }
        })
    }, [navigation])
    const accessContacts = () => {
        setIsLoading(true)
        let contactsaray = []
        Contacts.getAll()
            .then((contacts) => {
                console.warn('gettttt', contacts);
                contacts?.map((list, i) => {
                    contactsaray.push({
                        displayName: list?.displayName,
                        phoneNumbers: list?.phoneNumbers,
                        recordID: list?.recordID,
                        familyName: list?.familyName
                    })
                })
                setContactData(contactsaray)
                setFullData(contactsaray)
                dispatch(expenseActions?.setAllContacts({ contacts: contactsaray }));
                setIsLoading(false)
            })
            .catch((e) => { //handle error })
                setError(e)
                setIsLoading(false)
            })
    }
    const keyExtractor = (item, idx) => {
        return item?.recordID?.toString() || idx?.toString();
    };
    const RenderItem = ({ contact }) => {
        return (
            <ContactContext.Provider value={{ selectedData, setSelectedData, contact: contact }}>
                <Contact />
            </ContactContext.Provider>
        )
    };
    const handleSearch = (query) => {
        console.log('query', query);
        if (query) {
            setsearchQuery(query)
            const formittedQuery = query.toLowerCase();
            const filteredData = filter(fullData, (user) => {
                return contains(user, formittedQuery);
            })
            setContactData(filteredData)
        }
    }
    useEffect(() => {
        // setSelectedData(expenseCTX?.addedFriendsList)
        // dispatch(expenseActions.setSelectedContact({ contact: selectedData }));

    }, [selectedData])

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
    const handleUNSelect = (name) => {
        const unSelectedDat = selectedData?.filter((list) => list?.displayName != name)
        setSelectedData(unSelectedDat)
    }
    const onFlatListEmpty = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, width: WINDOW_WIDTH }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.black }}>
                    No Data Found in Contacts
                </Text>
            </View>
        );
    }
    const ItemSelected = ({ name }) => {
        return (
            <View style={[styles.imgCon, FlexStyles.justifyContainCenter, FlexStyles.alignItems]}>
                <View style={[styles.cross]}>
                    <TouchableOpacity onPress={() => handleUNSelect(name)} >
                        <Entypo name="cross" color={Colors.darkGrey} size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.placeholder}>
                    <Text style={styles.txt}>{name[0]}</Text>
                </View>
                <Text style={styles.nameTxt}>{name}</Text>

            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.child1}>
                <ScrollView style={{ marginRight: 4 }}>
                    <FlatList
                        data={selectedData}
                        horizontal={true}
                        style={{ width: '100%' }}
                        renderItem={({ item }) => <ItemSelected name={item?.displayName} />}
                        keyExtractor={keyExtractor}
                    // ListEmptyComponent={onFlatListEmpty}
                    />
                </ScrollView>

            </View>
            <FlatList
                data={contactData}
                renderItem={({ item }) => <RenderItem contact={item} />}

                // renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListEmptyComponent={onFlatListEmpty}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginHorizontal: 20,
    },
    child1: {
        flexDirection: 'row',
        // height: WINDOW_HEIGHT * 0.1,
        borderBottomWidth: 0.5,
        borderBottomColor: '#d9d9d9',
        padding: 5,
        paddingTop: 10
    },
    imgCon: { position: 'relative', flex: 1, flexDirection: 'column', margin: 5 },
    placeholder: {
        width: 55,
        height: 55,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#d9d9d9',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.primary,
        color: Colors.black
    },
    cross: {
        position: 'absolute',
        right: -2,
        top: -1,
        zIndex: 1
    },
    txt: {
        fontSize: 18,
        color: Colors.black
    },
    nameTxt: {
        fontSize: 10,
        color: Colors.black
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
