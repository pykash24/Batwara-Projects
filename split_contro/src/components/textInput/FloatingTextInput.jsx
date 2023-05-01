import React, { useRef } from 'react';
import { View, TextInput, StyleSheet, Animated } from 'react-native';
import { Colors } from '../../constants/Colors';

const FloatingTextInput = ({ label, value, onChangeText }) => {
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

    return (
        <View>
            <Animated.Text style={[styles.label, animatedLabelStyle]}>{label}</Animated.Text>
            <TextInput
                style={styles.textInput}
                value={value}
                onChangeText={onChangeText}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        position: 'absolute',
        left: 2,
        marginTop: -13,
        backgroundColor: Colors.commonCardBackground,
        textAlign: 'center',
        borderRadius: 5,
        padding: 1.8,
    },
});

export default FloatingTextInput;