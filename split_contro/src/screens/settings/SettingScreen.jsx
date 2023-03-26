import React from "react";
import {View, Text, StyleSheet} from "react-native";
import TabContainer from "../../components/TabContainer";
import { Colors } from "../../constants/Colors";

const SettingsScreen = () => {
  return (
    <TabContainer>
      <View style={styles.container}>
        <Text style={styles.text}>Settings Screen</Text>
      </View>
    </TabContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.bgColor,
  },
  text: {
    fontWeight: "bold",
    fontSize: 32,
    color: Colors.dark,
  },
});

export default SettingsScreen;