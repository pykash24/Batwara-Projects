import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';
import { Header } from '@react-navigation/native-stack';


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Share from 'react-native-share';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as files from '../../assets/fileBase64';
import woman from '../../assets/images/commonImage/woman.png'
import men from '../../assets/images/commonImage/men.png'
import { Colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import FontAwesomIcon from 'react-native-vector-icons/FontAwesome5';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import fetchApi from '../../shared/AxiosCall'
import { GetUserDetails } from '../../shared/ConfigUrl';
import { useDispatch } from 'react-redux';
import { getUserDetails } from '../../store/thunks/UserDetailThunk';

const ProfileScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [userData, setUserData] = useState({})
    useEffect(() => {
        let payload = {
            user_id: "be31d44f-2c0b-40ae-b082-469868a19866",
        };
        dispatch(getUserDetails(payload)).then((res)=>{
            if (res?.payload?.status == "success") {
                setUserData(res?.payload?.data[0])
                console.log('resfffffff',res?.payload?.data[0]            );
            }
        })
    }, [])
    useEffect(() => {
        navigation.setOptions({
            headerLargeTitle: true,
            headerTitle: "Profile",
            headerLeft: () => (
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.goBack()}>
                    <FontAwesomIcon name="arrow-left" color={Colors.white} size={20} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Edit-profile')}>
                    <Material name="account-edit" color={Colors.white} size={30} />
                </TouchableOpacity>
            ),
            styles: { color: Colors.white }
        })

    }, [navigation])

    const myCustomShare = async () => {
        const shareOptions = {
            message: 'Split expenses with friends now easy just share',
            url: files.appLogo,
            // urls: [files.image1, files.image2]
        }

        try {
            const ShareResponse = await Share.open(shareOptions);
            console.log(JSON.stringify(ShareResponse));
        } catch (error) {
            console.log('Error => ', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        source={woman}
                        size={80}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>{userData?.full_name  } </Title>
                        <Caption style={styles.caption}>{'Kavi'}</Caption>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="map-marker-radius" color={Colors.darkGrey} size={20} />
                    <Text style={{ color: Colors.darkGrey, marginLeft: 20 }}>{userData?.address ? userData?.address : "..."}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="phone" color={Colors.darkGrey} size={20} />
                    <Text style={{ color: Colors.darkGrey, marginLeft: 20 }}>{userData?.user_phone ? userData?.user_phone : "..."}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" color={Colors.darkGrey} size={20} />
                    <Text style={{ color: Colors.darkGrey, marginLeft: 20 }}>{userData?.user_mail ? userData?.user_mail : "..."}</Text>
                </View>
            </View>

            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1
                }]}>
                    <Title>{userData?.expenseRemain ? userData.expenseRemain : "0"}</Title>
                    <Caption>Wallet</Caption>
                </View>
                <View style={styles.infoBox}>
                    <Title>{userData?.totalGroups ? userData?.totalGroups : "0"}</Title>
                    <Caption>Groups</Caption>
                </View>
            </View>

            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="heart-outline" color={Colors.primary} size={25} />
                        <Text style={styles.menuItemText}>Your Favorite Trips</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="credit-card" color={Colors.primary} size={25} />
                        <Text style={styles.menuItemText}>Payment Details</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={myCustomShare}>
                    <View style={styles.menuItem}>
                        <Icon name="share-outline" color={Colors.primary} size={25} />
                        <Text style={styles.menuItemText}>Tell Your Friends</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="account-check-outline" color={Colors.primary} size={25} />
                        <Text style={styles.menuItemText}>Support</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        {/* <Icon name="setting" color={Colors.primary} size={25}/> */}
                        <Ionicons name="settings" color={Colors.primary} size={25} />

                        <Text style={styles.menuItemText}>Settings</Text>
                    </View>
                </TouchableRipple>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});