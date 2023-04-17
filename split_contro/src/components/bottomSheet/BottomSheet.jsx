import { StatusBar, StyleSheet, View, Dimensions, Platform, Animated, PanResponder, TextInput, FlatList } from 'react-native'
import React, { useEffect, useRef } from 'react';
import { Colors } from '../../constants/Colors'
import { WINDOW_HEIGHT } from '../../utils/utils';
import FontAwesomIcon from 'react-native-vector-icons/FontAwesome5';
import {
    Text,
} from 'react-native-paper';
import { TripsData } from '../../data/expense/Expense';
import FlexStyles from '../../assets/Styles/FlexStyles';
const bottomSheetMaxHeight = WINDOW_HEIGHT * 0.8
const bottomSheetMinHeight = WINDOW_HEIGHT * 0.4
const maxUpwardTranslateY = bottomSheetMinHeight - bottomSheetMaxHeight //negative no
const maxDownwordTranslateY = 0
const dragThreshold = 50
const BottomSheet = ({ children }) => {

    const animatedValue = useRef(new Animated.Value(0)).current;
    const lastGestureDy = useRef(0);
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                console.log('grant', lastGestureDy.current);
                animatedValue.setOffset(lastGestureDy.current)
            },
            onPanResponderMove: (e, gesture) => {
                console.log('move', gesture.dy);

                animatedValue.setValue(gesture.dy)
            },
            onPanResponderRelease: (e, gesture) => {
                console.log('release', gesture.dy);

                lastGestureDy.current += gesture.dy
                if (lastGestureDy.current < maxUpwardTranslateY) {
                    lastGestureDy.current = maxUpwardTranslateY
                }
                else if (lastGestureDy.current > maxDownwordTranslateY) {
                    lastGestureDy.current = maxDownwordTranslateY
                }

                if (gesture.dy > 0) {
                    //drag down
                    if (gesture.dy <= dragThreshold) {
                        springAnimation('up')
                    }
                    else {
                        springAnimation('down')
                    }

                } else {
                    //drag down
                    if (gesture.dy >= -dragThreshold) {
                        springAnimation('down')
                    }
                    else {
                        springAnimation('up')
                    }
                }
            }
        })
    ).current;
    const springAnimation = (direction = 'up' | 'down') => {
        lastGestureDy.current =
            direction == 'down' ?
                maxDownwordTranslateY : maxUpwardTranslateY

        Animated.spring(animatedValue, {
            toValue: lastGestureDy.current,
            useNativeDriver: true
        }).start

    }
    const bottomSheetAnimation = {
        transform: [{
            translateY: animatedValue.interpolate({
                inputRange: [maxUpwardTranslateY, maxDownwordTranslateY],
                outputRange: [maxUpwardTranslateY, maxDownwordTranslateY],
                extrapolate: "clamp"
            })
        }]
    }
    useEffect(() => {
        animatedValue.setValue(0)

        // console.log('animatedValue',animatedValue?.AnimatedValue);
        return () => {
        }
    }, [])
    const handlechangeInput = (text) => {
        console.log('hhhh', text);
        // setShowBottom(true)
    }
    const Item = ({ title }) => (
        <View style={[FlexStyles.gap10, FlexStyles.flexDirectionrow, FlexStyles.alignItems]}>
            <FontAwesomIcon name="search" color={Colors.grey1} size={14} />
            <Text style={styles.subText}>{title}</Text>
        </View>
    );
    return (
        <View style={[styles.container]}>
            <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
                <View style={styles.dragarea} {...panResponder.panHandlers}>
                    <View style={[styles.dragHandler]} />
                </View>
                <View style={styles.childView}>
                    <View style={[styles.searchOuterView, styles.pl20]}>
                        <FontAwesomIcon name="search" color={Colors.grey1} size={14} />
                        <TextInput placeholder='search by group name' onChange={(text) => handlechangeInput(text)}
                            style={[styles.searchInput]} />
                    </View>
                    <View style={[styles.pl20]}>
                        <Text style={{ color: Colors.darkGrey, marginVertical: 20 }}>{"Recent"}</Text>
                        <FlatList
                            data={TripsData}
                            renderItem={({ item }) => <Item title={item.title} />}
                            keyExtractor={item => item.id}
                        />
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
        backgroundColor: Colors.white1
    },
    bottomSheet: {
        position: 'absolute',
        backgroundColor: Colors.white1,
        width: '100%',
        height: WINDOW_HEIGHT * 0.6,
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
    },
    childView: {
        flex: 1,
        marginTop: 10,
    },
    searchOuterView: {
        flexDirection: 'row',
        backgroundColor: '#EFECE5',
        borderRadius: 40,
        alignItems: 'center',
        color: Colors.black,
        marginHorizontal: 20
        // paddingVertical: 2,
        // paddingLeft: 20,
    },
    searchInput: {
        fontSize: 15,
        color: Colors.black,
        paddingHorizontal: 10
    },
    pl20: {
        paddingLeft: 20
    },
    subText: {
        fontSize: 14,
        margin: 10
    }
})