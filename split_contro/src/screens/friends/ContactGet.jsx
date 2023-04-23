import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, Text, View, FlatList, PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import Contact from './Contact';

export default function ContactGet() {
    const [contactData, setContactData] = useState([])
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
    const accessContacts = () => {
        // Contacts.getAll((err, data) => {
        //   data.sort(
        //     (a, b) =>
        //       a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        //   );
        //   if (err === 'denied') {
        //     Alert.alert('Permission to access contacts was denied');
        //     console.warn('Permission to access contacts was denied');
        //   } else {
        //     console.log('cooo',data);
        //     // setContactData(data);
        //   }
        // });
        Contacts.getAll()
            .then((contacts) => {
                console.warn('gettttt', contacts);
                setContactData(contacts)
                // work with contacts
            })
            .catch((e) => { //handle error })
            })
    }

    const openContact = (contact) => {
        Contacts.openExistingContact(contact, () => { });
    };
    const itemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#607D8B",
                }}
            />
        );
    }
    const keyExtractor = (item, idx) => {
        console.log('ite,m',item);
        return item?.recordID?.toString() || idx.toString();
      };
      const renderItem = ({item, index}) => {
        return <Contact contact={item} />;
      };
    return (
        <View style={[styles.container]}>
            <FlatList
                data={contactData}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                style={styles.list}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    list: {
        // flex: 1,
      },
   
});
