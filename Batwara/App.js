import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      OTP: ''
    };
  }

  handlePhoneNumber = (text) => {
    console.log('text---->',text);
    this.setState({ phoneNumber: text });
  };

  handleOTP = (text) => {
    console.log('handleSubmit---->');
    this.setState({ OTP: text });
  };

  handleSubmit = () => {
    console.log('handleSubmit---->');
    // Implement your OTP verification logic here
    console.log(this.state.phoneNumber, this.state.OTP);
  };

  render() {
    return (
      <View>
        <TextInput
          placeholder="Phone Number"
          onChangeText={this.handlePhoneNumber}
        />
        <TextInput
          placeholder="OTP"
          onChangeText={this.handleOTP}
        />
        <TouchableOpacity onPress={this.handleSubmit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginPage;

