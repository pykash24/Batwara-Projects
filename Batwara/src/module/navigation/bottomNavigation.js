import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import Batwaralanding from '../screen/Home/batwaraLanding';
import Accountlandingscreen from '../screen/Account/accountLandingScreen';
import Groupslanding from '../screen/Groups/groupsLanding';
import {useNavigation} from '@react-navigation/native';
const Tab = createBottomTabNavigator();

export default function Bottomnavigationtabs() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="Batwaralanding"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Batwaralanding"
        component={Batwaralanding}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? 'blue' : 'gray'}}>Home</Text>
          ),
          tabBarIcon: ({focused, color, size}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Batwaralanding')}>
              <Image
                source={require('../../assets/images/bottomImage/groupUnSelected.png')}
                style={{width: size, height: size, tintColor: color}}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Accountlandingscreen"
        component={Accountlandingscreen}
        options={{
          tabBarLabel: 'Accountlandingscreen',
          tabBarIcon: ({color, size}) => (
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
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
