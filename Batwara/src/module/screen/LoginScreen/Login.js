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
} from 'react-native';
import fetchApi from '../../shared/AxiosCall';
import {SendOtp} from '../../shared/ConfigUrl';
import CommonStyles from '../../../assets/Styles/CommonStyles.js';
import CommonTextInput from '../../shared/CommonTextInput.js';
// import FlexStyles from '../../../assets/FlexStyles';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      otp: '',
      isEmpExist: undefined,
    };
  }

  sendOtp = () => {
    let data = {
      user_phone: '8668776095',
    };
    fetchApi(SendOtp, data)
      .then(res => {
        console.log('sendOtp res:', res);
      })
      .catch(err => {
        console.log('sendOtp err:', err);
      });
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
    console.log('onChangeNumber: ', e);
    this.setState(
      {
        phoneNumber: e,
      },
      () => this.state.phoneNumber.length === 10 && this.findEmpexist(),
    );
  };

  findEmpexist = () => {
    console.log('findEmpexist called..');
    if (true) {
      // this is for when emp not registered.
      this.setState({
        isEmpExist: false,
      });
    } else {
      // this is for when emp already registered.
      this.setState({
        isEmpExist: true,
      });
    }
  };

  render() {
    console.log('phoneNumber:', this.state.phoneNumber);
    console.log('otp:', this.state.otp);
    console.log('this.state.isEmpExist:', this.state.isEmpExist);
    return (
      <SafeAreaView>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[CommonStyles.container]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              {this.state.isEmpExist == false ? (
                <View style={CommonStyles.inner}>
                  <Text style={CommonStyles.header}>Registration form</Text>
                  <CommonTextInput
                    placeholder="Phone number"
                    keyboardType="numeric"
                    value={this.state.phoneNumber}
                    onChangeText={e => this.onChangeNumber(e)}
                    maxLength={10}
                    secureTextEntry={false}
                  />
                  <CommonTextInput
                    placeholder="first Name"
                    keyboardType="numeric"
                    value={this.state.phoneNumber}
                    onChangeText={e => this.onChangeNumber(e)}
                    maxLength={10}
                    secureTextEntry={false}
                  />
                  <CommonTextInput
                    placeholder="Last Name"
                    keyboardType="numeric"
                    value={this.state.phoneNumber}
                    onChangeText={e => this.onChangeNumber(e)}
                    maxLength={10}
                    secureTextEntry={false}
                  />
                  <CommonTextInput
                    placeholder="Enter mail"
                    keyboardType="numeric"
                    value={this.state.phoneNumber}
                    onChangeText={e => this.onChangeNumber(e)}
                    maxLength={10}
                    secureTextEntry={false}
                  />
                  <View style={CommonStyles.btnContainer}>
                    <Button
                      title="Login"
                      onPress={() =>
                        this.setState({
                          isEmpExist : false
                        })
                        // this.props.navigation.navigate('LandingStackNavigator')
                      }
                    />
                  </View>
                </View>
              ) : (
                <View style={CommonStyles.inner}>
                  <Text style={CommonStyles.header}>Header</Text>
                  <CommonTextInput
                    placeholder="Phone number"
                    keyboardType="numeric"
                    value={this.state.phoneNumber}
                    onChangeText={e => this.onChangeNumber(e)}
                    maxLength={10}
                    secureTextEntry={false}
                  />
                  {this.state.isEmpExist == true && (
                    <CommonTextInput
                      placeholder="Enter OTP"
                      keyboardType="numeric"
                      onChangeText={e => this.setState({otp: e})}
                      value={this.state.otp}
                      maxLength={4}
                      secureTextEntry={true}
                    />
                  )}
                  <View style={CommonStyles.btnContainer}>
                    <Button
                      title="Login"
                      onPress={() =>
                        this.props.navigation.navigate('LandingStackNavigator')
                      }
                    />
                  </View>
                </View>
              )}
              {/* <View style={CommonStyles.inner}>
                <Text style={CommonStyles.header}>Header</Text>
                <CommonTextInput
                  placeholder="Phone number"
                  keyboardType="numeric"
                  value={this.state.phoneNumber}
                  onChangeText={e => this.onChangeNumber(e)}
                  maxLength={10}
                  secureTextEntry={false}
                />
                {this.state.isEmpExist == true && (
                  <CommonTextInput
                    placeholder="Enter OTP"
                    keyboardType="numeric"
                    onChangeText={e => this.setState({otp: e})}
                    value={this.state.otp}
                    maxLength={4}
                    secureTextEntry={true}
                  />
                )}
                <View style={CommonStyles.btnContainer}>
                  <Button
                    title="Login"
                    onPress={() =>
                      this.props.navigation.navigate('LandingStackNavigator')
                    }
                  />
                </View>
              </View> */}
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </ScrollView>
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

// const CommonStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   inner: {
//     padding: 24,
//     flex: 1,
//     justifyContent: 'space-around',
//   },
//   header: {
//     fontSize: 36,
//     marginBottom: 48,
//   },
//   textInput: {
//     height: 40,
//     borderColor: '#000000',
//     borderBottomWidth: 1,
//     marginBottom: 36,
//   },
//   btnContainer: {
//     backgroundColor: 'white',
//     marginTop: 12,
//   },
// });

export default Login;
