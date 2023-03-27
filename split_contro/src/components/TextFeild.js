import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

const TextFeild = ({ value = '', color }) => {
  return (
    <View>
      <Text style={{ color: !!color ? color : Colors.primary, fontWeight: '700' }}>{value}</Text>
    </View>
  )
}

export default TextFeild

const styles = StyleSheet.create({})