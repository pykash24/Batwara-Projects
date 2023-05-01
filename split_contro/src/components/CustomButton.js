import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../constants/Colors';
import FlexStyles from '../assets/Styles/FlexStyles.jsx';

export default function CustomButton({label, onPress, loading}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        FlexStyles.dflex,
        FlexStyles.flexDirectionrow,
        // buttonStyles.commmonButton,
        FlexStyles.justifyContainCenter,
      ]}>
      <View
        style={[
          buttonStyles.buttonBg,
          FlexStyles.flexDirectionrow,
          buttonStyles.commmonButton,
        ]}>
        <Text
          style={[buttonStyles.buttonText]}>
          {label}
        </Text>
        <View style={[buttonStyles.verticalLine]}></View>
        <ActivityIndicator size="small" color="#ffff" animating={loading}/>
      </View>
    </TouchableOpacity>
  );
}

const buttonStyles = StyleSheet.create({
  commmonButton: {
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonBg: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#ffff',
    marginLeft: 10,
    marginRight: 10,
  },
  verticalLine: {
    height: '100%',
    width: 1.5,
    backgroundColor: '#ffff',
    marginLeft: 10,
    marginRight: 10,
  }
});
