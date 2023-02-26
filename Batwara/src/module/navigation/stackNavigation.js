import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Prelogin from '../screen/LoginScreen/preLogin';
import Login from '../screen/LoginScreen/Login';
import RegistrationScreen from '../screen/Registration/registrationScreen';
import Batwaralanding from '../screen/Home/batwaraLanding';
import Bottomnavigationtabs from './bottomNavigation';
const Stack = createStackNavigator();

const LandingStack = createStackNavigator();
const RegistrationStack = createStackNavigator();

const StackNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{presentation: 'switch'}}>
      <Stack.Screen name="Prelogin" component={Prelogin} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LandingStackNavigator"
        component={LandingStackNavigator}
        options={{headerShown: false}}
        // options={{
        //   title: 'Landing',
        //   headerStyle: {
        //     backgroundColor: '#f4511e',
        //   },
        //   headerTintColor: '#fff',
        //   headerTitleStyle: {
        //     fontWeight: 'bold',
        //   },
        // }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export function LandingStackNavigator() {
  return (
    <LandingStack.Navigator>
      <LandingStack.Screen
        name="Bottomnavigationtabs"
        component={Bottomnavigationtabs}
        options={{headerShown: false}}
      />
      {/* <LandingStack.Screen name="Screen2" component={Screen2} /> */}
    </LandingStack.Navigator>
  );
}

export default StackNavigator;
