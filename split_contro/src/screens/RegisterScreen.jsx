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
import {user_register,SendOtp} from '../shared/ConfigUrl';

const RegisterScreen = ({navigation}) => {
  const [number, setnumber] = useState('');
  const [password, setpassword] = useState('');
  const [confiremPassword, setConfirempassword] = useState('');
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [user_mail, setuser_mail] = useState('');

  const [Otp, setOtp] = useState('');
  const [dobLabel, setDobLabel] = useState('Date of Birth');

  const getfirstName = first_name => {
    setfirst_name(first_name);
    console.log('first_name', first_name);
  };
  const getlastName = last_name => {
    setlast_name(last_name);
    console.log('last_name', last_name);
  };
  const getNumber = number => {
    setnumber(number);
    console.log('number', number);
  };
  const getOtp = otp => {
    setOtp(otp);
    console.log('otp', otp);
  };
  const getmail = user_mail => {
    setuser_mail(user_mail);
    console.log('user_mail', user_mail);
  };
  const getpass = password => {
    setpassword(password);
    console.log('password', password);
  };
  const getconfirmpass = confiremPassword => {
    setConfirempassword(confiremPassword);
    console.log('password', confiremPassword);
  };

  const sendOtp = () => {
    let data = {
      user_phone: number,
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
  const registration = () => {
    let data = {
      user_phone: number,
      user_password: password,
      first_name: first_name,
      last_name: last_name,
      user_mail: user_mail,
    };
    console.log('registration data:', data);

    fetchApi(user_register, data)
      .then(res => {
        navigation.navigate('Main');
        console.log('sendOtp res:', res);
      })
      .catch(err => {
        console.log('sendOtp err:', err);
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
          label={'First Name'}
          icon={user}
          setNumber={getfirstName}
          keyboardType="default"
          maxLength={256}
          sideButton={false}
          secureTextEntry={false}
        />
        <NewInputField
          label={'Last Name'}
          icon={user}
          setNumber={getlastName}
          keyboardType="default"
          maxLength={256}
          // onPress={sendOtp}
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
        <OtpInputBox onComplete={getOtp} />
        <NewInputField
          label={'Enter your mail ID'}
          icon={phonecall}
          setNumber={getmail}
          maxLength={256}
          keyboardType="email-address"
          sideButton={false}
          secureTextEntry={false}
        />
        <NewInputField
          label={'Set Password'}
          icon={phonecall}
          setNumber={getpass}
          keyboardType="default"
          maxLength={256}
          sideButton={false}
          secureTextEntry={true}
        />
        <NewInputField
          label={'Set confirm Password'}
          icon={phonecall}
          setNumber={getpass}
          keyboardType="default"
          maxLength={256}
          sideButton={false}
          secureTextEntry={true}
        />
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
