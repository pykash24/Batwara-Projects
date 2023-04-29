import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendScreen from '../screens/friends/FriendScreen';
import NewGroupScreen from '../screens/friends/NewGroupScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';
import { Colors } from '../constants/Colors';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfile';

const ProfileStack = () => {
    const Stack = createNativeStackNavigator();
    const commonHeaderStyles = {
        color: Colors.white,
        borderRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: Colors.primary
    }
    const headerd = {
        headerShown: true,
        headerStyle: commonHeaderStyles,
      }
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen}
                options={({ navigation }) => (headerd)}
            />
            <Stack.Screen name="Edit-profile" component={EditProfileScreen}
                options={({ navigation }) => (headerd)}
            />
        </Stack.Navigator>
    )
}

export default ProfileStack
const styles = StyleSheet.create({

    mr_15: {
        marginRight: 1
    }
})