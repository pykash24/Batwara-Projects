import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import FlexStyles from '../../assets/Styles/FlexStyles';
import { Female, Gender, Male, Other } from '../../constants/labels/Profile/EditProfileLabels';
import { Colors } from '../../constants/Colors';
import CommonStyles from '../../assets/Styles/CommonStyles';

const CommonRadioButton = ({ onPress, status, value,label }) => {
  const [checked, setChecked] = useState('male');

  return (
    <View>
      <Text style={[styles.heading, CommonStyles.ml15]}>{Gender}</Text>
      <View style={[FlexStyles.flexDirectionrow]}>
        <View style={[FlexStyles.flexDirectionrow, FlexStyles.alignItems, CommonStyles.ml10]}>
          <RadioButton
             value={value}
             status={status}
             onPress={onPress}
          />
          <Text style={styles.label}>{label}</Text>
        </View>
        <View style={[FlexStyles.flexDirectionrow, FlexStyles.alignItems, CommonStyles.ml20]}>
          <RadioButton
            value={value}
            status={status}
            onPress={onPress}
          />
          <Text style={styles.label}>{label}</Text>
        </View>
        <View style={[FlexStyles.flexDirectionrow, FlexStyles.alignItems, CommonStyles.ml20]}>
          <RadioButton
            value={value}
            status={status}
            onPress={onPress}
          />
          <Text style={styles.label}>{label}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 17,
    color: 'red',
    borderRadius: 5,
    padding: 1.8,
  },
  label: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 17,
    color: 'red',
    borderRadius: 5,
    padding: 1.8,
  },
});

export default CommonRadioButton;
