import React from "react";
import {View, StyleSheet, Animated} from "react-native";
import { Colors } from "../constants/Colors";
import {useTabMenu} from "../context/TabContext";

const TabContainer = ({children}) => {
  const opened= useTabMenu();
  console.log('ll',opened
  );
  const animation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: opened ? 1 : 0,
      duration: 300,
      friction: 2,
      useNativeDriver: false,
    }).start();
  }, [opened, animation]);

  return (
    <View style={styles.container}>
      {children}
      {/* {children}
      {opened && (
        <Animated.View
          style={[
            styles.overlay,
            {
              backgroundColor: animation.interpolate({
                inputRange: [0, 1],
                outputRange: ["transparent", Colors.dark],
              }),
            },
          ]}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    opacity: 0.2,
  },
});

export default TabContainer;