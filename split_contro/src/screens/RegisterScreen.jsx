import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import InputField from '../components/InputField';
import NewInputField from '../components/NewInputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import register from '../assets/images/register.png';

import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../constants/Colors';
import phonecall from '../assets/images/inputBox/phonecall.png';
import OtpInputBox from '../components/OtpInputBox.js';
import fetchApi from '../shared/AxiosCall';
import {SendOtp} from '../shared/ConfigUrl';
const RegisterScreen = ({navigation}) => {
  const [number, setnumber] = useState(false);
  const [Otp, setOtp] = useState('');
  const [dobLabel, setDobLabel] = useState('Date of Birth');
  const getOtp = otp => {
    setOtp(otp);
    console.log('otp', otp);
  };
  const getNumber = number => {
    setnumber(number);
    console.log('number', number);
  };
  // const onPress = () => {
  //   console.log('onPress click');
  // };

  const sendOtp = () => {
    let data = {
      user_phone: number,
      // user_phone: '8668776095',
    };
    console.log('sendOtp called:', data);
    if (number.length == 10) {
      fetchApi(SendOtp, data)
        .then(res => {
          console.log('sendOtp res:', res);
        })
        .catch(err => {
          console.log('sendOtp err:', err);
        });
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.bgColor,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Image source={register} style={{width: 300, height: 200}} />
        </View>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Sign In Your Account
        </Text>
        <NewInputField
          label={'Enter mobile no'}
          icon={phonecall}
          setNumber={getNumber}
          // value={number}
          keyboardType="numeric"
          maxLength={10}
          onPress={sendOtp}
          sideButton={true}
        />
        <OtpInputBox onComplete={getOtp} />
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 14,
            fontWeight: '500',
            color: '#333',
            marginBottom: 20,
            textAlign: 'center',
          }}>
          Or Continue with
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
            onPress={() => {}}
          />
          <Icon.Button
            name="facebook"
            backgroundColor={Colors.primary}
            onPress={() => {}}>
            Login with Facebook
          </Icon.Button>

          <Icon.Button
            name="twitter"
            backgroundColor={Colors.primary}
            onPress={() => {}}
          />
        </View>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 14,
            fontWeight: '500',
            color: '#333',
            marginBottom: 20,
            textAlign: 'center',
          }}>
          New User Registrations
        </Text>
        <CustomButton
          label={'Register'}
          onPress={() => {
            navigation.navigate('Main');
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text style={{color: Colors.dark, fontWeight: '700'}}>
            Already registered?
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: Colors.primary, fontWeight: '700'}}>
              {' '}
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
