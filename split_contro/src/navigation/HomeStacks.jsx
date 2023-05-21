import React from 'react'
import HomeScreen from '../screens/overview/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../constants/Colors';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';

export default function HomeStacks() {
    const Stack = createNativeStackNavigator();
    const commonHeaderStyles = {
        color: Colors.white,
        borderRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: Colors.primary
    }
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={HomeScreen} 
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
const styles = StyleSheet.create({
   
    mr_15: {
        marginRight: 15
    }
})