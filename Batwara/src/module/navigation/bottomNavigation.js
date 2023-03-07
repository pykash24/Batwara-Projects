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
      screenOptions={({route}) => ({
        // headerShown: false,
        tabBarActiveTintColor: '#ffff',
        tabBarStyle: {
          height: 60,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: '#F17120',
          position: 'absolute',
          borderTopWidth: 0,
        },
      })}
      // screenOptions={{
      //   tabBarActiveTintColor: '#e91e63',
      //   // tabBarOptions={{
      //   //   style: {
      //   //     backgroundColor: 'blue', // set the background color here
      //   //   },
      //   // }}
      // }}
    >
      <Tab.Screen
        name="Batwaralanding"
        component={Batwaralanding}
        options={{
          tabBarLabel: ({focused}) => (
            <View>
              <Text style={{color: focused ? '#ffff' : 'gray'}}>Home</Text>
            </View>
          ),
          tabBarIcon: ({focused, color, size}) => (
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
              onPress={() => navigation.navigate('Batwaralanding')}>
              <View
                style={[
                  {
                    height: 0,
                    borderTopWidth: focused ? 10 : 0,
                    borderTopColor: 'white',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    width: 40,
                    marginBottom: 5,
                  },
                ]}></View>
              <Image
                source={require('../../assets/images/bottomImage/home.png')}
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
          tabBarLabel: ({focused}) => (
            <View>
              <Text style={{color: focused ? '#ffff' : 'gray'}}>
                Friends
              </Text>
            </View>
          ),
          tabBarIcon: ({focused, color, size}) => (
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
              onPress={() => navigation.navigate('Accountlandingscreen')}>
              <View
                style={[
                  {
                    height: 0,
                    borderTopWidth: focused ? 10 : 0,
                    borderTopColor: 'white',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    width: 40,
                    marginBottom: 5,
                  },
                ]}></View>
              <Image
                source={require('../../assets/images/bottomImage/friends.png')}
                style={{width: size, height: size, tintColor: color}}
              />
            </TouchableOpacity>
          ),
          // tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Groupslanding"
        component={Groupslanding}
        options={{
          tabBarLabel: ({focused}) => (
            <View>
              <Text style={{color: focused ? '#ffff' : 'gray'}}>
                Analytics
              </Text>
            </View>
          ),
          tabBarIcon: ({focused, color, size}) => (
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
              onPress={() => navigation.navigate('Batwaralanding')}>
              <View
                style={[
                  {
                    height: 0,
                    borderTopWidth: focused ? 10 : 0,
                    borderTopColor: 'white',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    width: 40,
                    marginBottom: 5,
                  },
                ]}></View>
              <Image
                source={require('../../assets/images/bottomImage/statistics.png')}
                style={{width: size, height: size, tintColor: color}}
              />
            </TouchableOpacity>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Groupslanding"
        component={Groupslanding}
        options={{
          tabBarLabel: 'Groupslanding',
          tabBarIcon: ({focused, color, size}) => (
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
              onPress={() => navigation.navigate('Batwaralanding')}>
              <View
                style={[
                  {
                    height: 0,
                    borderTopWidth: focused ? 10 : 0,
                    borderTopColor: 'white',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    width: 40,
                    marginBottom: 5,
                  },
                ]}></View>
              <Image
                source={require('../../assets/images/bottomImage/setting.png')}
                style={{width: size, height: size, tintColor: color}}
              />
            </TouchableOpacity>
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
