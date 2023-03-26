import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Image,
} from 'react-native';
import fetchApi from '../../shared/AxiosCall';
import {SendOtp} from '../../shared/ConfigUrl';
import CommonStyles from '../../../assets/Styles/CommonStyles.js';
import CommonTextInput from '../../shared/CommonTextInput.js';
import FlexStyles from '../../../assets/Styles/FlexStyles';
import CommonButton from '../../shared/CommonButton.js';
import LoginStyles from './LoginStyles';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      otp: '',
    };
  }

  sendOtp = () => {
    let data = {
      user_phone: this.state.phoneNumber,
      // user_phone: '8668776095',
    };
    console.log('sendOtp called:', data);
    if (this.state.phoneNumber.length == 10) {
      fetchApi(SendOtp, data)
        .then(res => {
          console.log('sendOtp res:', res);
        })
        .catch(err => {
          console.log('sendOtp err:', err);
        });
    }
  };

  // sendOtp =()=>{
  //   let data ={
  //     user_phone:"8668776095"
  //   }
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     // 'Authorization': 'Bearer ' + token
  //   };
  //   axios.post('https://7137-115-98-234-221.in.ngrok.io/authentication/send-otp/',data,{ headers: headers })
  //   .then(response => {
  //     console.log("response:",response);
  //   })
  //   .catch(error => {
  //     console.error("error:",error);
  //   });
  // }

  onChangeNumber = e => {
    this.setState({
      phoneNumber: e,
    });
  };

  render() {
    console.log('phoneNumber:', this.state.phoneNumber.length);
    console.log('otp:', this.state.otp);
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    return (
      <SafeAreaView style={[FlexStyles.flex1]}>
            {/* <KeyboardAvoidingView behavior='position' style={[
            FlexStyles.flex1,
            FlexStyles.flexDirectioncolumn,
            FlexStyles.justifyContainCenter,
            FlexStyles.alignItems,
          ]}
          keyboardVerticalOffset={keyboardVerticalOffset}> */}
        {/* <ScrollView> */}
        {/* <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[CommonStyles.container]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <View
          style={[
            FlexStyles.flex1,
            FlexStyles.flexDirectioncolumn,
            FlexStyles.justifyContainCenter,
            FlexStyles.alignItems,
          ]}>
          <View>
            <Image
              source={require('../../../assets/images/logo/batwaralogo1.png')}
              style={[LoginStyles.logoStyle]}
            />
          </View>
           <KeyboardAvoidingView behavior='position' style={[LoginStyles.registrationCard]}
          keyboardVerticalOffset={keyboardVerticalOffset}>
          {/* <View style={[LoginStyles.registrationCard]}> */}
            <Text>Sign In Your Account</Text>
            <Text>
              Please fill up mobile number and OTP to log in to your account
            </Text>
            <CommonTextInput
              placeholder="Phone number"
              keyboardType="numeric"
              value={this.state.phoneNumber}
              onChangeText={e => this.onChangeNumber(e)}
              maxLength={10}
              secureTextEntry={false}
              rightButtonView={true}
              rightButtonLabel={'Send OTP'}
              onPress={this.sendOtp}
            />
            <CommonTextInput
              placeholder="Enter OTP"
              keyboardType="numeric"
              onChangeText={e => this.setState({otp: e})}
              value={this.state.otp}
              maxLength={4}
              secureTextEntry={true}
            />
            <View style={[]}>
              <CommonButton
                title="Login"
                onPress={() =>
                  this.props.navigation.navigate('LandingStackNavigator')
                }
              />
            </View>
            {true && (
              <Text style={[FlexStyles.dflex, FlexStyles.flexDirectionrow]}>
                You are not registred yet. Please press on
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('RegistrationScreen')
                  }
                  style={[FlexStyles.alignItems]}>
                  <Text>Register</Text>
                </TouchableOpacity>
              </Text>
            )}
            </KeyboardAvoidingView>
          {/* </View> */}
        </View>
        {/* </TouchableWithoutFeedback>
          </KeyboardAvoidingView> */}
        {/* </ScrollView> */}
      </SafeAreaView>

      // <View>
      //   <Button
      //     title="Go to Landing"
      //     // onPress={() => this.props.navigation.navigate('LandingStackNavigator')}
      //     onPress={() => this.sendOtp()}
      //     // onPress={() =>
      //     //   this.props.navigation.navigate('Details', { name: 'Custom Details header' })
      //     // }
      //   />
      //   <Button
      //     title="Go to Details"
      //     onPress={() => this.props.navigation.navigate('Details')}
      //     // onPress={() =>
      //     //   this.props.navigation.navigate('Details', { name: 'Custom Details header' })
      //     // }
      //   />
      //   <Button
      //     title="Push Details screen into the stack"
      //     onPress={() => this.props.navigation.push('Details')}
      //   />
      //   <Button
      //     title="Go back from Details"
      //     onPress={() => this.props.navigation.goBack()}
      //   />
      //   <Button
      //     title="Go back to first screen in stack"
      //     onPress={() => this.props.navigation.popToTop()}
      //   />

      //   <Button
      //     title="Go to Details and pass details"
      //     onPress={() =>
      //       this.props.navigation.navigate('Try', {
      //         names: 'Batwara app created at 302',
      //         otherParam: 'anything you want here',
      //       })
      //     }
      //   />
      // </View>
    );
  }
}

export default Login;
