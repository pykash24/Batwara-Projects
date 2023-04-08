import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import SettingsScreen from '../screens/settings/SettingScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';
import { Colors } from '../constants/Colors';

const SettingsStack = () => {
    const Stack = createNativeStackNavigator();
    const commonHeaderStyles = {
        color: Colors.white,
        borderRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: Colors.primary
    }
    return (
        <Stack.Navigator
            >
            <Stack.Screen name="Settings" component={SettingsScreen} 
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
            })}/>
        </Stack.Navigator>
    )
}

export default SettingsStack
const styles = StyleSheet.create({
   
    mr_15: {
        marginRight: 15
    }
})