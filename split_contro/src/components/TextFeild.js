import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

const TextFeild = ({ type, value = '', color, fontWeight }) => {
  return (
    <View>
      <Text style={[type == "heading" ? styles.headingText
        : type == "subHeading" ? styles.subHeadingText : styles.normalText,
      { color: !!color ? color : Colors.black}]}>
        {value}
      </Text>
    </View>
  )
}

export default TextFeild

const styles = StyleSheet.create({
  headingText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.black
  },
  subHeadingText: {
    fontWeight: 400,
    fontSize: 14,
    color: Colors.black
  },
  normalText: {
    fontSize: 12,
    color: Colors.black
  }

})