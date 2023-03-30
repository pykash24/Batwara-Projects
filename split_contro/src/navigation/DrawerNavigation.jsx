import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TabNavigator } from './BottomTabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={TabNavigator} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation

const styles = StyleSheet.create({})