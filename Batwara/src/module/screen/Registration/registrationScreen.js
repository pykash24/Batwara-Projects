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
import LoginStyles from '../LoginScreen/LoginStyles';
class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      phoneNumber: '',
      otp: '',
    };
  }
  registerUser = () => {
    let data = {
      fname: this.state.fname,
      lname: this.state.lname,
      phoneNumber: this.state.phoneNumber,
      otp: this.state.otp,
      // user_phone: '8668776095',
    };
    console.log('sendOtp called:', data);
      fetchApi(SendOtp, data)
        .then(res => {
          console.log('sendOtp res:', res);
        })
        .catch(err => {
          console.log('sendOtp err:', err);
        });
  };

  validationRegister = () => {
    if (
      this.state.fname != '' &&
      this.state.lname != '' &&
      this.state.phoneNumber != '' &&
      this.state.otp != ''
    ) {
      this.registerUser();
    } else {
      alert('some thing miss.');
    }
  };

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[CommonStyles.container]}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[LoginStyles.registrationCard]}>
              <Text style={LoginStyles.headerTitle}>Create New Account</Text>
              <Text style={LoginStyles.headerDescription}>
                Please fill up all inputs to create a new account.
              </Text>
              <CommonTextInput
                placeholder="First Name"
                keyboardType="default"
                value={this.state.fname}
                onChangeText={e => this.setState({fname: e})}
                maxLength={256}
                secureTextEntry={false}
                rightButtonView={false}
              />
              <CommonTextInput
                placeholder="Last Name"
                keyboardType="default"
                value={this.state.lname}
                onChangeText={e => this.setState({lname: e})}
                maxLength={256}
                secureTextEntry={false}
                rightButtonView={false}
              />
              <CommonTextInput
                placeholder="Mobile"
                keyboardType="numeric"
                value={this.state.phoneNumber}
                onChangeText={e => this.setState({phoneNumber: e})}
                maxLength={10}
                secureTextEntry={false}
                rightButtonView={true}
                rightButtonLabel={'Send OTP'}
                onPress={this.handlePress}
              />
              <CommonTextInput
                placeholder="OTP Verification"
                keyboardType="numeric"
                value={this.state.otp}
                onChangeText={e => this.setState({otp: e})}
                maxLength={6}
                secureTextEntry={true}
                rightButtonView={false}
              />
              <CommonButton
                title="SIGN UP"
                onPress={() => this.validationRegister()}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
export default RegistrationScreen;
