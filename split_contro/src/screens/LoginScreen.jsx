import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import NewInputField from '../components/NewInputField';
import phonecall from '../assets/images/inputBox/phonecall.png';
import fetchApi from '../shared/AxiosCall';
import {
  SendOtp,
  user_authenticaton,
  opt_authentication,
} from '../shared/ConfigUrl';
import OtpInputBox from '../components/OtpInputBox.js';
import facebook from '../assets/images/login/facebook.png';
import google from '../assets/images/login/google.png';
import twitter from '../assets/images/login/twitter.png';
import FlexStyles from '../assets/Styles/FlexStyles';
import CommonStyles from '../assets/Styles/CommonStyles';
import LoginStyles from './LoginStyles';
import CustomButton from '../components/CustomButton';
import frontLogo from '../assets/images/login/frontLogo.png';
import InputField from '../components/InputField';
import Toast from 'react-native-toast-message';

import {Colors} from '../constants/Colors';
import TextFeild from '../components/TextFeild';

const LoginScreen = ({navigation}) => {
  const [number, setnumber] = useState(false);
  const [Otp, setOtp] = useState('');
  const [otp_id, setotp_id] = useState('');
  const [mailId, setid] = useState('');
  const [password, setpassword] = useState('');
  const [loginType, setloginType] = useState('otp');

  const getOtp = otp => {
    setOtp(otp);
    console.log('otp', otp);
  };
  const getNumber = number => {
    setnumber(number);
    console.log('number', number);
  };
  const getid = mailId => {
    setid(mailId);
    console.log('mailId', mailId);
  };
  const getpass = pass => {
    setpassword(pass);
    console.log('pass', pass);
  };

  const sendOtp = () => {
    let data = {
      user_phone: number,
      // user_phone: '8668776095',
    };
    console.log('sendOtp called:', data);
    if (number.length == 10) {
      fetchApi(SendOtp, data)
        .then(res => {
          if (res.status == 200) {
            setotp_id(res.data.otp_id);
            console.log('sendOtp res:', res);
          }
        })
        .catch(err => {
          console.log('err.response.status:', err.response.status);
          console.log('err.response.data.message:', err.response.data.message);
          if (err.response.status == 400) {
            alert(err.response.data.message);
            Toast.show({
              type: 'success',
              text1: err.response.data.message,
              text2: 'content de te revoir',
            });
          }
          console.log('sendOtp err:', err);
        });
    }
  };

  const login = loginType => {
    if (loginType == 'otp') {
      let data = {
        user_phone: number,
        user_otp: Otp,
        otp_id: otp_id,
      };
      let endPoint = opt_authentication;
    } else if (loginType == 'idpass') {
      let data = {
        user_mail: mailId,
        user_password: password,
      };
      let endPoint = user_authenticaton;
    }
    fetchApi(endPoint, data)
      .then(res => {
        if (res.status == 200) {
          console.log('login res:', res);
        }
      })
      .catch(err => {
        console.log('login err:', err);
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
        style={{paddingHorizontal: 15}}>
        <View>
          <View style={{alignItems: 'center'}}>
            <Image
              source={frontLogo}
              style={{
                width: 300,
                height: 200,
                resizeMode: 'contain',
              }}
            />
          </View>

          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 28,
              fontWeight: '500',
              color: Colors.gray,
              marginBottom: 15,
            }}>
            Sign In Your Account
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 14,
              fontWeight: '500',
              color: Colors.gray,
              marginBottom: 20,
            }}>
            Please fill up mobile number and OTP to log in to your account
          </Text>

          <View
            style={[
              FlexStyles.flexDirectionrow,
              CommonStyles.mb30,
              CommonStyles.gap10,
            ]}>
            <TouchableOpacity
              onPress={() => setloginType('otp')}
              style={
                loginType == 'otp'
                  ? [
                      {
                        borderWidth: 1,
                        padding: 5,
                        borderRadius: 10,
                        borderColor: 'rgba(233,239,246,1)',
                        backgroundColor: Colors.gray,
                      },
                    ]
                  : [
                      {
                        borderWidth: 1,
                        padding: 5,
                        borderRadius: 10,
                        borderColor: 'rgba(233,239,246,1)',
                      },
                    ]
              }>
              <TextFeild value="OTP base" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setloginType('idpass')}
              style={
                loginType == 'idpass'
                  ? [
                      {
                        borderWidth: 1,
                        padding: 5,
                        borderRadius: 10,
                        borderColor: 'rgba(233,239,246,1)',
                        backgroundColor: Colors.gray,
                      },
                    ]
                  : [
                      {
                        borderWidth: 1,
                        padding: 5,
                        borderRadius: 10,
                        borderColor: 'rgba(233,239,246,1)',
                      },
                    ]
              }>
              <TextFeild value="User ID & Password" />
            </TouchableOpacity>
          </View>
          {loginType == 'otp' && (
            <>
              <NewInputField
                label={'Enter mobile no'}
                icon={phonecall}
                setNumber={getNumber}
                keyboardType="numeric"
                maxLength={10}
                onPress={sendOtp}
                sideButton={true}
              />
              <OtpInputBox onComplete={getOtp} />
            </>
          )}
          {loginType == 'idpass' && (
            <>
              <NewInputField
                label={'Enter your User ID'}
                icon={phonecall}
                setNumber={getNumber}
                keyboardType="email-address"
                sideButton={false}
              />
              <NewInputField
                label={'Enter your Password'}
                icon={phonecall}
                setNumber={getNumber}
                keyboardType="email-address"
                sideButton={false}
              />
            </>
          )}

          <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
            Or, Continue With ...
          </Text>

          <View
            style={[
              FlexStyles.flexDirectionrow,
              FlexStyles.flexarround,
              CommonStyles.mb30,
            ]}>
            <View
              style={{
                borderWidth: 2,
                padding: 10,
                borderRadius: 5,
                borderColor: 'rgba(233,239,246,1)',
              }}>
              <Image source={google} style={[LoginStyles.loginwithlogoStyle]} />
            </View>
            <View
              style={{
                borderWidth: 2,
                padding: 10,
                borderRadius: 5,
                borderColor: 'rgba(233,239,246,1)',
              }}>
              <Image
                source={twitter}
                style={[LoginStyles.loginwithlogoStyle]}
              />
            </View>
            <View
              style={{
                borderWidth: 2,
                padding: 10,
                borderRadius: 5,
                borderColor: 'rgba(233,239,246,1)',
              }}>
              <Image
                source={facebook}
                style={[LoginStyles.loginwithlogoStyle]}
              />
            </View>
          </View>
          <View
            style={[
              FlexStyles.flexDirectionrow,
              FlexStyles.alignItems,
              FlexStyles.justifyContainCenter,
              CommonStyles.mb30,
              CommonStyles.gap10,
            ]}>
            <TextFeild value={'New User'} color={Colors.gray} />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <TextFeild value="Registrations" />
            </TouchableOpacity>
          </View>
          <CustomButton
            label={'SIGN IN'}
            onPress={() => {
              login(loginType);
              // navigation.navigate('Main');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
