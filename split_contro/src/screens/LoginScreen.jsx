import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { Colors } from '../constants/Colors';
import splash2 from '../assets/images/splash2.png'
import TextFeild from '../components/TextFeild';

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <Image source={splash2} style={{
            width: 300, height: 200, resizeMode: 'contain',
          }} />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: Colors.gray,
            marginBottom: 30,
          }}>
          Login
        </Text>

        <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
        />

        <InputField
          label={'Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => { }}
        />

        <CustomButton label={"Login"} onPress={() => { navigation.navigate('Main') }} />

        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <Icon.Button
            name="google"
            backgroundColor={Colors.primary}
            onPress={() => { }} />
          <Icon.Button
            name="facebook"
            backgroundColor={Colors.primary}
            onPress={() => { }}   >
            Login with Facebook
          </Icon.Button>

          <Icon.Button
            name="twitter"
            backgroundColor={Colors.primary}
            onPress={() => { }} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
            gap:20
          }}>
          <TextFeild value={'New to the app?'} color={Colors.gray} />
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <TextFeild value='Register'/> 
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
