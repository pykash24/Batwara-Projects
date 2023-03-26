import { StyleSheet, Text, TouchableOpacity, View, Animated, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '../constants/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { useTabMenu } from '../context/TabContext';
import { transformer } from '../../metro.config';
import InputField from './InputField';

const AddButton = ({  }) => {
  const animation = useRef(new Animated.Value(0)).current;
 const [opened,setOpened]=useState(false)
//  const {opened, toggleOpened} = useTabMenu();


 console.log('jj',opened);
 const toggleOpened=()=>{
  setOpened(!opened)
 }
  useEffect(() => {
    Animated.timing(animation, {
      toValue: opened ? 1 : 0,
      duration: 300,
      friction: 2,
      useNativeDriver: false,
    }).start();

  }, [opened, animation])
  const opacity = {
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    }),
  };
  return (
    <View style={styles.container}>
      <View style={styles.box}>
          <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -60],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -50],
                    }),
                  },
                ],
              },
            ]}>
            <AntIcons name="form" color={Colors.primary} size={20} />

          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -100],
                    }),
                  },
                ],
              },
            ]}>
            <Ionicons name="mail" color={Colors.primary} size={20} />

          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 60],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -50],
                    }),
                  },
                ],
              },
            ]}>
            <Ionicons name="download" color={Colors.primary} size={20} />

          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={ ()=>{toggleOpened()}} style={styles.addButton}>
          {/* <View style={styles.addButtonInner}> */}
          <Animated.View
            style={[
              styles.addButtonInner,
              {
                transform: [
                  {
                    rotate: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "45deg"],
                    }),
                  },
                ],
              },
            ]}>
            <Ionicons name="add" color={Colors.primary} size={30} />
          </Animated.View>
          {/* </View> */}
        </TouchableWithoutFeedback>
      </View>

    </View>
  )
}

export default AddButton

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    height: 0,

  },
  box: {
    position: 'relative',
    width: 60,
    height: 60,
    marginTop: -30,
  },
  item: {
    position: 'absolute',
    top: 5,
    left: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor:Colors.primary,    
    borderWidth:5,
    elevation:3
  },
  addButton: {
    shadowColor: Colors.dark,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  addButtonInner: {
    alignItems: 'center',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 30,
    borderColor:Colors.primary,
    borderWidth:5,
    elevation:3
  }
})