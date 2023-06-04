import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Splashscreen from '../screens/Splashscreen';
import { TabNavigator } from './BottomTabs';
import AddScreen from '../screens/add/AddScreen';
import { Colors } from '../constants/Colors';
import ProfileStack from './ProfileStack';
import ContactGet from '../screens/friends/ContactGet';
import Schedule from '../components/calendar/Schedule';
import AddGroup from '../screens/add/AddGroup';

const Stack = createNativeStackNavigator();
const commonHeaderStyles = {
  color: Colors.white,
  borderRadius: 20,
  borderBottomLeftRadius: 20,
  backgroundColor: Colors.primary
}
const headerd = {
  headerShown: true,
  headerStyle: commonHeaderStyles,
}
function Rootnavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTitleStyle: styles.headerTitle,

        }}>
        <Stack.Screen name="Splash" component={Splashscreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="AddExpense" component={AddScreen} />
        <Stack.Screen name="Profile" component={ProfileStack} />
        <Stack.Screen name="Contacts" component={ContactGet}
          options={({ navigation }) => (headerd)} />
        <Stack.Screen name="Schedule" component={Schedule}
          options={({ navigation }) => (headerd)} />
        <Stack.Screen name="AddGroup" component={AddGroup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Rootnavigation;
const styles = StyleSheet.create({
  headerTitle: {
    color: Colors.white,
  },
})