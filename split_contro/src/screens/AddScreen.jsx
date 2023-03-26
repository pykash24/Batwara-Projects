import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextFeild from '../components/TextFeild'

const AddScreen = () => {
  return (
    <View style={styles.container}>
      <TextFeild
      value={"AddScreen"}/>
    </View>
  )
}

export default AddScreen

const styles = StyleSheet.create({
  container:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    color:'black',
    height:'100%'
  }
})