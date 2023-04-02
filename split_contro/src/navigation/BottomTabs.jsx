const { createBottomTabNavigator } = require("@react-navigation/bottom-tabs");
import SettingScreen from '../screens/settings/SettingScreen';
import HomeScreen from '../screens/overview/HomeScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypoicons from 'react-native-vector-icons/Entypo';

import FontAwesomIcon from 'react-native-vector-icons/FontAwesome5';
import Analytics from '../screens/analytics/Analytics';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../constants/Colors';
import AddScreen from '../screens/AddScreen';
import AddButton from '../components/AddButton';
import FriendScreen from '../screens/friends/FriendScreen';
import { useTabMenu } from '../context/TabContext';

const Tab = createBottomTabNavigator();

const getTabBarVisibility = route => {
    console.log(route);
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
    console.log('routeName:', routeName);

    if (routeName == 'Home') {
        return 'none';
    }
    return 'flex';
};
export const TabNavigator = () => {
    const {opened, toggleOpened} = useTabMenu();
    console.log('opened:',opened);
     return (
        <Tab.Navigator
            // initialRouteName='Home'
            screenOptions={{
                tabBarShowLabel: true,
                headerShown: true,
                tabBarStyle: styles.tabBar,
                tabBarInactiveTintColor: Colors.gray,
                tabBarActiveTintColor: Colors.white,
                headerStyle: {
                    backgroundColor: Colors.primary,
                }
            }}>
            <Tab.Screen
                name="Overview"
                component={HomeScreen}
                onPress={() => console.log('Overview tab pressed')} // added onPress event handler
                options={({ route }) => ({
                    tabBarItemStyle: {
                        // height:12
                    },

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
                options={({ route }) => ({
                    tabBarItemStyle: {
                        // height:0
                    },
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={[styles.tabIconContainer]}>
                            {!!focused && <View style={styles.tabActiveStrip} />}
                            <FontAwesomIcon name="user-friends" color={color} size={size} />
                        </View>
                    ),
                })}
            />
            <Tab.Screen
                name="Add"
                component={AddScreen}
                onPress={() => console.log('add tab pressed')} // added onPress event handler
                options={({ route }) => ({
                    tabBarItemStyle: {
                        // height: 0
                    },
                    tabBarButton: () => <AddButton opened={opened} toggleOpened={toggleOpened} />,
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
                options={({ route }) => ({
                    tabBarItemStyle: {
                        // height:0
                    },
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={[styles.tabIconContainer]}>
                            {!!focused && <View style={styles.tabActiveStrip} />}
                            <Ionicons name="md-analytics-sharp" color={color} size={size} />
                        </View>
                    ),
                })}
            />
            <Tab.Screen
                name="Settings"
                component={SettingScreen}
                options={({ route }) => ({
                    tabBarItemStyle: {
                        // height:12
                    },
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={[styles.tabIconContainer]}>
                            {!!focused && <View style={styles.tabActiveStrip} />}
                            <Ionicons name="settings" color={color} size={size} />
                        </View>
                    ),
                })}
            />

        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        paddingBottom: 3,
        left: 16,
        right: 16,
        bottom: 20,
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
    }
})