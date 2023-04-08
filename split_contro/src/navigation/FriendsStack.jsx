import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendScreen from '../screens/friends/FriendScreen';
import NewGroupScreen from '../screens/friends/NewGroupScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';
import { Colors } from '../constants/Colors';

const FriendsStack = () => {
    const Stack = createNativeStackNavigator();
    const commonHeaderStyles = {
        color: Colors.white,
        borderRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: Colors.primary
    }
    const headerd = {
        headerTitle: () => <Header name={"Hello, Batwara"} />,
        headerRight: () => (
            <View style={styles.mr_15}>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="bell" color={Colors.white} size={25} />
                </TouchableOpacity>
            </View>
        ),
        headerStyle: commonHeaderStyles,
    }
    return (
        <Stack.Navigator>
            <Stack.Screen name="friends" component={FriendScreen}
                options={({ navigation }) => (headerd)}
            />
            <Stack.Screen name="newGroup" component={NewGroupScreen}
                options={({ navigation }) => (headerd)}
            />
        </Stack.Navigator>
    )
}

export default FriendsStack
const styles = StyleSheet.create({

    mr_15: {
        marginRight: 1
    }
})