const { createBottomTabNavigator } = require("@react-navigation/bottom-tabs");
import SettingScreen from '../screens/settings/SettingScreen';
import HomeScreen from '../screens/overview/HomeScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypoicons from 'react-native-vector-icons/Entypo';

import FontAwesomIcon from 'react-native-vector-icons/FontAwesome5';
import Analytics from '../screens/analytics/Analytics';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import AddScreen from '../screens/add/AddScreen';
import AddButton from '../components/AddButton';
import FriendScreen from '../screens/friends/FriendScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';

const Tab = createBottomTabNavigator();
const commonHeaderStyles = {
    color: Colors.white,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: Colors.primary
}
export const TabNavigator = () => {

    return (
        <Tab.Navigator
            // initialRouteName='Home'
            screenOptions={{
                tabBarShowLabel: true,
                headerShown: true,
                tabBarStyle: styles.tabBar,
                tabBarInactiveTintColor: Colors.white,
                tabBarActiveTintColor: Colors.white,
                headerStyle: {
                    backgroundColor: Colors.primary,
                }
            }}>
            <Tab.Screen
                name="Overview"
                component={HomeScreen}

                onPress={() => console.log('Overview tab pressed')} // added onPress event handler
                options={({ navigation }) => ({

                    headerTitle: () => <Header name={"Hello, Batwara"} />,
                    headerRight: () => (
                        <View style={styles.mr_15}>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name="bell" color={Colors.white} size={25} />
                            </TouchableOpacity>
                        </View>
                    ),
                    headerStyle: commonHeaderStyles,

                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={[styles.tabIconContainer]}>
                            {!!focused && <View style={styles.tabActiveStrip} />}
                            <Entypoicons name="home" color={color} size={size} />
                        </View>
                    ),
                })}
            />
            <Tab.Screen
                name="Friends"
                component={FriendScreen}
                onPress={() => console.log('Friends tab pressed')} // added onPress event handler

                options={({ navigation }) => {
                    return {
                        headerTitle: () => <Header name={"Hello, Batwara"} navigation={navigation} />,
                        tabBarIcon: ({ color, size, focused }) => (
                            <View style={[styles.tabIconContainer]}>
                                {!!focused && <View style={styles.tabActiveStrip} />}
                                <FontAwesomIcon name="user-friends" color={color} size={size} />
                            </View>
                        ),
                        headerStyle: commonHeaderStyles,
                    };
                }}

            />
            <Tab.Screen
                name="Add"
                component={AddScreen}
                onPress={() => console.log('add tab pressed')} // added onPress event handler
                options={({ navigation }) => ({
                    tabBarItemStyle: {
                        // height: 0
                    },
                    tabBarButton: () =>
                        <AddButton />
                    ,
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={[styles.tabIconContainer]}>
                            {!!focused && <View style={styles.tabActiveStrip} />}
                            <Ionicons name="add" color={color} size={size} />
                        </View>
                    ),
                })}
            />
            <Tab.Screen
                name="Analytics"
                component={Analytics}
                onPress={() => console.log('Analytics tab pressed')} // added onPress event handler
                options={({ navigation }) => ({
                    headerTitle: () => <Header name={"Analytics"} />,

                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={[styles.tabIconContainer]}>
                            {!!focused && <View style={styles.tabActiveStrip} />}
                            <Ionicons name="md-analytics-sharp" color={color} size={size} />
                        </View>
                    ),
                    headerStyle: commonHeaderStyles,

                })}
            />
            <Tab.Screen
                name="Settings"
                component={SettingScreen}
                options={({ navigation }) => ({
                    headerTitle: () => <Header name={"Settings"} />,

                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={[styles.tabIconContainer]}>
                            {!!focused && <View style={styles.tabActiveStrip} />}
                            <Ionicons name="settings" color={color} size={size} />
                        </View>
                    ),
                    headerStyle: commonHeaderStyles,
                })}
            />

        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        position: 'relative',
        paddingBottom: 3,
        // left: 10,
        // right: 10,
        bottom: 0,
        height: 56,
        borderRadius: 16,
        backgroundColor: Colors.primary,
        borderTopColor: 'transparent',
        shadowColor: Colors.dark,
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    tabActiveStrip: {
        position: 'absolute',
        width: 50,
        height: 5,
        backgroundColor: Colors.white,
        top: -13,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    tabIconContainer: {
        position: 'absolute',
        top: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mr_15: {
        marginRight: 15
    }
})