import React, { useRef } from 'react';
import { View, TextInput, StyleSheet, Animated } from 'react-native';
import { Colors } from '../../constants/Colors';
import { SendOTP } from '../../constants/labels/Profile/EditProfileLabels';

const FloatingTextInput = ({ label, setNumber=()=>{}, setText,textStyles, text, value, placeholder, keyboardType, secureTextEntry, maxLength, onPress, OTPButton, onChangeText }) => {
    const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;
    const handleFocus = () => {
        Animated.timing(animatedIsFocused, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        Animated.timing(animatedIsFocused, {
            toValue: value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const animatedLabelStyle = {
        top: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [21, 0],
        }),
        fontSize: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 14],
        }),
        color: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: ['#AAAA', '#1E293B'],
        }),
    };

    const setNumberFunction = (number) => {
        setNumber(number)
    }

    return (
        <View>
            <Animated.Text style={[styles.label, animatedLabelStyle,textStyles]}>{label}</Animated.Text>
            <TextInput
                style={styles.textInputColor}
                value={value}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={(number) => setNumberFunction(number)}

                placeholder={placeholder}
                keyboardType={keyboardType}
                maxLength={maxLength}
                secureTextEntry={secureTextEntry}
            />
            {OTPButton == true && (
                <Animated.Text
                    style={[styles.OtpButtonStyle]}
                    onPress={onPress}
                > {SendOTP}
                </Animated.Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    textInputColor: {
        color: Colors.commonTextBlack,
        fontSize: 14,
    },
    label: {
        position: 'absolute',
        left: 2,
        marginTop: -13,
        backgroundColor: Colors.commonCardBackground,
        textAlign: 'center',
        borderRadius: 5,
        padding: 1.8,
    },
    OtpButtonStyle: {
        position: 'absolute',
        right: 0,
        top: 8,
        backgroundColor: Colors.primary,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 6,
        color: Colors.white,
        fontSize: 12,
    }
});

export default FloatingTextInput;