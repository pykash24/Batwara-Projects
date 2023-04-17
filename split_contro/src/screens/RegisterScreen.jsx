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
import user from '../assets/images/inputBox/user.png';
import OtpInputBox from '../components/OtpInputBox.js';
import fetchApi from '../shared/AxiosCall';
import {sign_up_otp_verification, sign_up_send_otp} from '../shared/ConfigUrl';

const RegisterScreen = ({navigation}) => {
  const [number, setnumber] = useState('');
  const [Otp, setOtp] = useState('');
  const [otp_unique_id, setotp_unique_id] = useState('');
  const [full_name, setfull_name] = useState('');
  const [nationCode, setnationCode] = useState('+91');

  const getNumber = number => {
    setnumber(number);
    console.log('number', number);
  };

  const getfullName = full_name => {
    setfull_name(full_name);
    console.log('full_name', full_name);
  };

  const getnation = nationCode => {
    setnationCode(nationCode);
    console.log('nationCode', nationCode);
  };

  const varifySendOTP = () => {
    if (number === '') {
      console.log('enter the mobile no');
    } else {
      sendOtp();
    }
  };
  const setOTP = otp => {
    setOtp(otp);
  };
  const varifyRegistration = otp => {
    if (number === '') {
      console.log('enter the mobile no');
    } else if (Otp === '') {
      console.log('enter the otp');
    } else if (otp_unique_id === '') {
      console.log('enter the otp');
    } else if (full_name === '') {
      console.log('enter the full name');
    } else if (nationCode === '') {
      console.log('enter the nation code');
    } else {
      registration();
    }
  };
  const sendOtp = () => {
    let data = {
      user_phone: number ? number : '',
      nation: '+91',
    };
    console.log('sendOtp called:', data);
    if (number.length == 10) {
      fetchApi(sign_up_send_otp, data)
        .then(res => {
          if (res.status == 200) {
            setotp_unique_id(res.data.otp_unique_id);
            console.log('sendOtp res:', res);
          }
        })
        .catch(err => {
          console.log('sendOtp err:', err);
        });
    }
  };
  const registration = () => {
    let data = {
      user_phone: number,
      user_otp: Otp,
      otp_unique_id: otp_unique_id,
      full_name: full_name,
      nation: nationCode,
    };
    console.log('registration data:', data);

    fetchApi(sign_up_otp_verification, data)
      .then(res => {
        if (res.status == 200) {
          navigation.navigate('Login');
          console.log('sendOtp res:', res);
        }
      })
      .catch(err => {
        console.log('sendOtp err:', err, err.message);
      });
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
            marginBottom: 10,
          }}>
          Create New Account
        </Text>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 14,
            fontWeight: '500',
            color: '#333',
            marginBottom: 20,
          }}>
          Please fill up all inputs to create a new account.
        </Text>
        <NewInputField
          label={'Full Name'}
          icon={user}
          setNumber={getfullName}
          keyboardType="default"
          maxLength={256}
          sideButton={false}
          secureTextEntry={false}
        />
        <NewInputField
          label={'Enter mobile no'}
          icon={phonecall}
          setNumber={getNumber}
          keyboardType="numeric"
          maxLength={10}
          onPress={sendOtp}
          sideButton={true}
          secureTextEntry={false}
        />
        <OtpInputBox onComplete={setOTP} />
        <CustomButton
          label={'Register'}
          onPress={() => {
            registration();
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