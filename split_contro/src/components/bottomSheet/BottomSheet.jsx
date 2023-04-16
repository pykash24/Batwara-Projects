import { StatusBar, StyleSheet, Text, View, Dimensions, Platform, Animated, PanResponder } from 'react-native'
import React, { useEffect, useRef } from 'react';
import { Colors } from '../../constants/Colors'
import { Button, Portal } from 'react-native-paper'
import { WINDOW_HEIGHT } from '../../utils/utils';

const bottomSheetMaxHeight = WINDOW_HEIGHT * 0.6
const bottomSheetMinHeight = WINDOW_HEIGHT * 0.2
const BottomSheet = () => {

    const bottomSheetHeight = WINDOW_HEIGHT * 0.25
    const seviceWidth = Dimensions.get('window').width
    // const bottom=React.useRef(new Animated.value(-bottomSheetHeight)).current
    const animatedValue = useRef(new Animated.Value(0)).current;
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => { },
            onPanResponderMove: (e, gesture) => {
                animatedValue.setValue(gesture.dy)
            },
            onPanResponderRelease: () => { }
        })
    ).current;
    
    const bottomSheetAnimation = {
        transform: [{ translateY: animatedValue }]
    }
    useEffect(() => {
        animatedValue.setValue(0)

    // console.log('animatedValue',animatedValue?.AnimatedValue);
      return () => {
      }
    }, [])
    
    return (
        <View style={[styles.container]}>
            <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
                <View style={styles.dragarea} { ...panResponder.panHandlers }>
                    <View style={[styles.dragHandler]}>
                    </View>
                </View>
            </Animated.View>
        </View>
    )
}

export default BottomSheet

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomSheet: {
        position: 'absolute',
        backgroundColor: Colors.white,
        width: '100%',
        height: WINDOW_HEIGHT*0.6,
        bottom: bottomSheetMinHeight - bottomSheetMaxHeight,
        borderTopRightRadius: 32,
        borderTopLeftRadius: 32,
        ...Platform.select({
            android: { elevation: 3 },
            ios: {
                shadowColor: "#a8bed2",
                shadowOpacity: 1,
                shadowRadius: 6,
                shadowOffset: {
                    width: 2,
                    height: 2
                }
            }
        })
    },
    dragarea: {
        width: 132,
        height: 32,
        justifyContent: 'center',
        alignSelf: 'center',
        // backgroundColor: 'red'

    },
    dragHandler: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 100,
        height: 6,
        // margin: 5,
        backgroundColor: "#d3d3d3"
    }
})