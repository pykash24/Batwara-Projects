// In Rootnavigation.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Splashscreen from '../screens/Splashscreen';
import { TabNavigator } from './BottomTabs';
import { Colors } from '../constants/Colors';


const Stack = createNativeStackNavigator();

function Rootnavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{headerShown: false,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="Splash" component={Splashscreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Rootnavigation;