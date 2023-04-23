import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import userAvatar from '../assets/images/homescreen/userAvatar.png'
import { useNavigation } from '@react-navigation/native'
import woman from '../assets/images/commonImage/woman.png'

const Header = ({name}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.ml_10,styles.fd_row,styles.container]}>
      <TouchableOpacity
      onPress={()=>navigation.navigate('Profile')}
      >
      <Image  source={woman} style={styles.image}/>
      </TouchableOpacity>
      <Text style={styles.label}>{name}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container:{
    color: Colors.white,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: Colors.primary
  },
    label:{
        fontWeight:'bold',
        fontSize:14,
        color:Colors.white
    },
    ml_10:{
        marginLeft:5
    },
    image:{
      width:30,
      height:30,
      borderRadius:10,
      marginRight:5
    },
    fd_row:{
      flex:1,
      flexDirection:'row',
      alignItems:'center'
    }
})