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
class CommonTextInput extends Component {
  render() {
    const {placeholder, value, maxLength, keyboardType, onChangeText, secureTextEntry} = this.props;
    return (
      <View>
        <TextInput
          placeholder={placeholder}
          style={CommonTextStyles.textInput}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          value={value}
          maxLength={maxLength}
          secureTextEntry ={secureTextEntry}
        />
      </View>
    );
  }
}

const CommonTextStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});

export default CommonTextInput;
