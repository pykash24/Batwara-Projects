import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Prelogin from '../screen/LoginScreen/preLogin';
import Login from '../screen/LoginScreen/Login';
import Batwaralanding from '../screen/Home/batwaraLanding';
import Bottomnavigationtabs from "./bottomNavigation";
const Stack = createStackNavigator();

const LandingStack = createStackNavigator();
// const Stack2 = createStackNavigator();

const StackNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{presentation: 'switch'}}>
      <Stack.Screen name="Prelogin" component={Prelogin} />
      <Stack.Screen name="Login" component={Login} />
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

// function StackNavigator2() {
//   return (
//     <Stack2.Navigator>
//       <Stack2.Screen name="Screen3" component={Screen3} />
//       <Stack2.Screen name="Screen4" component={Screen4} />
//     </Stack2.Navigator>
//   );
// }

export default StackNavigator;

// import React, {Component} from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import { createStackNavigator } from '@react-navigation/stack';

// import {NavigationContainer} from '@react-navigation/native';

// import Prelogin from '../screen/LoginScreen/preLogin';
// import Login from '../screen/LoginScreen/Login';
// import Try from '../shared/try';

// const Stack = createNativeStackNavigator();
// // const Stack = createStackNavigator();

// export default function StackNavigation() {
//   // <Stack.Navigator>
//   //   <Stack.Screen name="Prelogin" component={Prelogin} />
//   //   <Stack.Screen name="Login" component={Login} />
//   // </Stack.Navigator>
//   <NavigationContainer>
//     <Stack.Navigator initialRouteName="Prelogin">
//       <Stack.Screen
//         name="Prelogin"
//         component={Prelogin}
//         options={{
//           title: 'Prelogin',
//           headerStyle: {
//             backgroundColor: '#f4511e',
//           },
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//         }}
//       />
//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{
//           title: 'Login',
//           headerStyle: {
//             backgroundColor: '#f4511e',
//           },
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//         }}
//       />
//       options={({ route }) => ({ title: route.params.name })}      this is use for custom header title
//       <Stack.Screen name="Try" component={Try} options={{title: 'Try'}} />
//     </Stack.Navigator>
//   </NavigationContainer>;
// }
