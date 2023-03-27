import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Colors } from '../constants/Colors';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
        color: Colors.dark
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholderTextColor={Colors.gray}
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0, color: Colors.dark }}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholderTextColor={Colors.gray}
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0, color: Colors.dark }}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: Colors.primary, fontWeight: '700' }}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
