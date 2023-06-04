import React, {useState, useRef} from 'react';
import {
  TextInput,
  Animated,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../constants/Colors';

const NewInputField = ({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  setNumber,
  maxLength,
  value,
  Text,
  onPress,
  sideButton,
  secureTextEntry
}) => {
  const [text, setText] = useState('');
  const placeholderAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null); // create a ref to the TextInput component

  const handleFocus = () => {
    Animated.timing(placeholderAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
    // inputRef.current.focus();
  };

  const handleBlur = () => {
    console.log("handleBlur run")
    if (text === '') {
      Animated.timing(placeholderAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
    else {
      console.log("handleBlur else run")
      // If there is text in the input field, animate the label text to the top of the input box
      Animated.timing(placeholderAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
  };

  const translateY = placeholderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 0],
  });

  const fontSize = placeholderAnim.interpolate({
    inputRange: [0, 2],
    outputRange: [16, 12],
  });
const setno =(number) => {
  console.log("setno number1:", number)
  setText(number)
  setNumber(number)
} 
// console.log("secureTextEntry:",secureTextEntry)
  return (
    <Animated.View style={styles.container}>
      <TouchableOpacity onPress={() => inputRef.current.focus()}>
        <Image source={icon} style={styles.icon} />
      </TouchableOpacity>
      <Animated.Text
        style={[styles.label, {transform: [{translateY}], fontSize}]}
        onPress={() => inputRef.current.focus()}
        pointerEvents="none">
        {label}
      </Animated.Text>
      <TextInput
        ref={inputRef} // attach the ref to the TextInput component
        style={styles.input}
        value={text}
        onChangeText={text => setno(text)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder=""
        keyboardType={keyboardType}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
      />
      {sideButton == true && (
        <Animated.Text
          style={[styles.rightlabel]}
          onPress={onPress}
        >
          Send OTP
        </Animated.Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightlabel: {
    position: 'absolute',
    right: 0,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    borderRadius: 8,
    color: '#ffff',
    fontSize: 14,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 5,
    position: 'absolute',
    top: -12,
  },
  label: {
    position: 'absolute',
    top: -5,
    left: 30,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    color: '#ccc',
    zIndex: 1,
  },
  input: {
    fontSize: 16,
    color: '#000',
    paddingVertical: 10,
    paddingLeft: 32,
    borderWidth: 2,
    borderColor: "rgba(233,239,246,1)",
    borderRadius: 5,
    flex: 1,
  },
});

export default NewInputField;

// import React, { useState, useRef } from 'react';
// import { View, Text, TouchableOpacity, TextInput,Animated, StyleSheet  } from 'react-native';
// import { Colors } from '../constants/Colors';

// export default function NewInputField({label,icon,inputType,keyboardType,fieldButtonLabel,fieldButtonFunction}) => {
//
//
// }

// // {
// //   return (
// //     <View
// //       style={{
// //         flexDirection: 'row',
// //         borderWidth: 1,
// //         borderRadius: 5,
// //         padding:8,
// //         borderColor: '#ccc',
// //         marginBottom: 25,
// //         color: Colors.dark
// //       }}>
// //       {icon}
// //       {inputType == 'password' ? (
// //         <TextInput
// //           placeholderTextColor={Colors.gray}
// //           placeholder={label}
// //           keyboardType={keyboardType}
// //           style={{ flex: 1, paddingVertical: 0, color: Colors.dark }}
// //           secureTextEntry={true}
// //         />
// //       ) : (
// //         <TextInput
// //           placeholderTextColor={Colors.gray}
// //           placeholder={label}
// //           keyboardType={keyboardType}
// //           style={{ flex: 1, paddingVertical: 0, color: Colors.dark }}
// //         />
// //       )}
// //       <TouchableOpacity onPress={fieldButtonFunction}>
// //         <Text style={{ color: Colors.primary, fontWeight: '700' }}>{fieldButtonLabel}</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }
