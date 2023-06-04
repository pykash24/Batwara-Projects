import { StyleSheet, Text, TouchableOpacity, View, Animated, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Colors } from '../constants/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { homeActions } from '../store/slice/HomeSlice';
import { useDispatch, useSelector } from 'react-redux';
import wallet from '../assets/images/bottomImage/wallet.png'
import record from '../assets/images/bottomImage/record.png'
import addGroup from '../assets/images/bottomImage/add-group.png'
import { useNavigation } from '@react-navigation/native';

const AddButton = ({ }) => {
  const navigation = useNavigation();

  const animation = useRef(new Animated.Value(0)).current;
  const [opened, setOpend] = useState(false)
  const dispatch = useDispatch()
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
  const changeTab = () => {
    console.log('999999tabch');
    setOpend(!opened)
    dispatch(homeActions.setIsTab({value:!opened}));
  }
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
            {/* <AntIcons name="form" color={Colors.primary} size={20} /> */}
            <Image source={record} style={styles.image} />

          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => { navigation.navigate('AddExpense'), changeTab() }}>
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
            <Image source={wallet} style={styles.image} />

            {/* <Ionicons name="mail" color={Colors.primary} size={20} /> */}

          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => { navigation.navigate('AddGroup'), changeTab() }}>
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
            {/* <Ionicons name="download" color={Colors.primary} size={20} /> */}
            <Image source={addGroup} style={styles.image} />

          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => changeTab()} style={styles.addButton}>
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
  image: {
    width: 25,
    height: 25,
    // borderRadius:10,
    // marginRight:5
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
    borderColor: Colors.primary,
    borderWidth: 5,
    elevation: 3
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
    borderColor: Colors.primary,
    borderWidth: 5,
    elevation: 3
  }
})