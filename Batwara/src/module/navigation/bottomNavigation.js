import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Batwaralanding from '../screen/Home/batwaraLanding'
import Accountlandingscreen from '../screen/Account/accountLandingScreen'
import Groupslanding from '../screen/Groups/groupsLanding'

const Tab = createBottomTabNavigator();

export default function Bottomnavigationtabs() {
  return (
    <Tab.Navigator
      initialRouteName="Batwaralanding"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Batwaralanding"
        component={Batwaralanding}
        options={{
          tabBarLabel: 'Batwaralanding',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Accountlandingscreen"
        component={Accountlandingscreen}
        options={{
          tabBarLabel: 'Accountlandingscreen',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Groupslanding"
        component={Groupslanding}
        options={{
          tabBarLabel: 'Groupslanding',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}