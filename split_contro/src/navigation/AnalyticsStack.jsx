import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Analytics from '../screens/analytics/Analytics';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';
import { Colors } from '../constants/Colors';

const AnalyticsStack = () => {
    const Stack = createNativeStackNavigator();
    const commonHeaderStyles = {
        color: Colors.white,
        borderRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: Colors.primary
    }
    return (
        <Stack.Navigator>
            <Stack.Screen name="Analytics" component={Analytics} 
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
            })} />
        </Stack.Navigator>
    )
}

export default AnalyticsStack

const styles = StyleSheet.create({
   
    mr_15: {
        marginRight: 15
    }
})