import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import FlexStyles from '../assets/Styles/FlexStyles'

const TextFeild = ({ type, value = '', color, fontWeight, startIcon = null, endIcon = null }) => {
  return (
    <View style={[FlexStyles.flexDirectionrow, FlexStyles.flexBetween]}>
      <View style={[FlexStyles.flexDirectionrow, FlexStyles.alignItems, FlexStyles.gap10]}>
        {startIcon}
        <Text style={[type == "heading" ? styles.headingText
          : type == "subHeading" ? styles.subHeadingText : styles.normalText,
        { color: !!color ? color : Colors.black }]}>
          {value}
        </Text>
      </View>
      { endIcon}
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