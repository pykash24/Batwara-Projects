import {
    View,
    Text,
    Pressable,
    StyleSheet,
    ActivityIndicator,
  } from "react-native";
  import React from "react";
import { Colors } from "../constants/Colors";
  
  const LoadingButton = ({
    title,
    onPress,
    customStyle,
    isLoading = false,
    disabled = false,
  }) => {
    return (
      <Pressable
        style={({ pressed }) => ({
          ...styles.button,
          ...customStyle,
  
          opacity: pressed || disabled ? 0.5 : 1,
        })}
        disabled={disabled}
        onPress={onPress}
      >
        {isLoading && (
          <ActivityIndicator
            size={"small"}
            color="#696969"
            style={styles.spinner}
          />
        )}
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
      // </LinearGradient>
    );
  };
  
  const styles = StyleSheet.create({
    gradient: { alignSelf: "flex-start", borderRadius: 8 },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 30,
      backgroundColor: Colors.primary,
      borderRadius: 8,
      elevation: 10,
      shadowColor: Colors.primary,
      flexDirection: "row",
      justifyContent: "center",
    },
    spinner: {
      marginRight: 4,
    },
    buttonText: {
      fontSize: 16,
      color: "#e9e9e9",
      fontWeight: "400",
      alignSelf: "center",
    },
  });
  
  export default LoadingButton;
  