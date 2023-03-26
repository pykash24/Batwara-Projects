import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import userprofile from '../assets/images/splash2.png'
import { Colors } from '../constants/Colors';
const Splashscreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View style={{marginTop: 20}}>
        <Text
          style={{
            fontFamily: 'Inter-Bold',
            fontWeight: 'bold',
            fontSize: 30,
            color: '#20315f',
          }}>
          BATWARA
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      <Image source={userprofile}  style={{width:300,height:300, resizeMode: 'contain',
}}/>

      </View>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.primary,
          padding: 20,
          width: '90%',
          borderRadius: 10,
          marginBottom: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily: 'Roboto-MediumItalic',
          }}>
          Let's Begin
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Splashscreen;
