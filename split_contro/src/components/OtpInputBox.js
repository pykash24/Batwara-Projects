import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import FlexStyles from '../assets/Styles/FlexStyles.jsx'
import CommonStyles from '../assets/Styles/CommonStyles.jsx'
import { Colors } from '../constants/Colors.js';
const OtpInputBox = ({ onComplete }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    if(index == 3){
        onComplete(newOtp.join(''));  // if user not click on done or close keyboard using back button it will help.
    }
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleInputDelete = (index) => {
    const newOtp = [...otp];
    newOtp[index] = '';
    setOtp(newOtp);
    if (index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleInputSubmit = () => {
    onComplete(otp.join(''));  // if user click on done button from keyboard using it will help.
  };

  return (
    <View style={[ FlexStyles.flexDirectionrow, FlexStyles.alignItems, FlexStyles.flexarround, CommonStyles.mv20]}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange(index, value)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              handleInputDelete(index);
            }
          }}
          value={value}
          ref={inputRefs[index]}
          onSubmitEditing={() => {
            if (index === 3) {
              handleInputSubmit();
            } else {
              inputRefs[index + 1].current.focus();
            }
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: 'rgba(233,239,246,1)',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: '15%',
    color:Colors.black
  },
});

export default OtpInputBox;
