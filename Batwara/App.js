import React from 'react';
import StackNavigator from './src/module/navigation/stackNavigation';

const App = () => (
  <StackNavigator />
);

export default App;


// import React, {Component} from 'react';
// import {View, Text, TextInput, TouchableOpacity} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import MyTabs from './src/module/navigation/bottomNavigation';
// import Try from './src/module/shared/try'
// import Login from './src/module/screen/LoginScreen/Login';
// import Prelogin from './src/module/screen/LoginScreen/preLogin'
// import StackNavigation from './src/module/navigation/stackNavigation'
// class LoginPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

//   render() {
//     const Stack = createNativeStackNavigator();
//     return (
//       <NavigationContainer>
//       <Stack.Navigator initialRouteName="Prelogin">
//         <Stack.Screen
//           name="Prelogin"
//           component={Prelogin}
//           options={{
//             title: 'Prelogin',
//             headerStyle: {
//               backgroundColor: '#f4511e',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//           }}
//         />
//         <Stack.Screen
//           name="Login"
//           component={Login}
//           options={{
//             title: 'Login',
//             headerStyle: {
//               backgroundColor: '#f4511e',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//           }}
//         />
//         options={({ route }) => ({ title: route.params.name })}      this is use for custom header title
//         <Stack.Screen name="Try" component={Try} options={{title: 'Try'}} />
//       </Stack.Navigator>
//     </NavigationContainer>

//     );
//   }
// }

// export default LoginPage;
