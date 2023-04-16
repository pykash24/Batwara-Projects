import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React from 'react'
import {Gesture,GestureDetector} from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { Colors } from '../../constants/Colors'

const {height:SCREEN_HEIGHT}=Dimensions.get('window')
const EditProfile = () => {
  const translateY=useSharedValue(0)

  const context=useSharedValue({y:0})
  const gesture =Gesture.Pan()
  .onStart(()=>{
    context.value={y:translateY.value}
  })
  .onUpdate((event)=>{
    console.log('gg',event);
    translateY.value=event.translationY + context.value.y;
  });

  const rBottomStyle=useAnimatedStyle(()=>{
    return{
      transform:[{translateY:translateY.value}]
    }
  })
  return (
   <GestureDetector gesture={gesture}>
    <Animated.View style={[styles.bottomSheetContainer,rBottomStyle]}>
      <View style={styles.line}></View>
    </Animated.View>
   </GestureDetector>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  bottomSheetContainer:{
    height:SCREEN_HEIGHT,
    width:'100%',
    backgroundColor:Colors.white,
    position:'absolute',
    top:SCREEN_HEIGHT/2.5,
    borderRadius:25
  },
  line:{
    width:75,
    height:4,
    backgroundColor:Colors.gray,
    alignSelf:'center',
    marginVertical:15,
    borderRadius:2

  },
})