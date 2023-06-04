import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import userprofile from '../assets/images/splash2.png';
import {Colors} from '../constants/Colors';
import FlexStyles from '../assets/Styles/FlexStyles';
import LoginStyles from './LoginStyles';
import CommonStyles from '../assets/Styles/CommonStyles';
import {splashHeader, splashTitle} from '../constants/StringsMessage'
const {width, height} = Dimensions.get('window');

class Splashscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.pan = new Animated.ValueXY();
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, {dx: this.pan.x, dy: this.pan.y}],
        {useNativeDriver: false},
      ),
      onPanResponderRelease: (event, gesture) => {
        Animated.spring(this.pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start();
        console.log('onPanResponderRelease called');
        console.log('this.pan.x:', this.pan.x._value);
        console.log('width:', width);
        if (this.pan.x._value >= Dimensions.get('window').width - Dimensions.get('window').width/2.2) {
          this.props.navigation.navigate('Login');
        } else {
          console.log('move again');
        }
      },
    });

    // Add a limit for the x direction
    const xMax =Dimensions.get('window').width - Dimensions.get('window').width/2.2; // Change this value to set the maximum x value
    this.clampedPan = this.pan.x.interpolate({
      inputRange: [-xMax, 0, xMax],
      outputRange: [-xMax, 0, xMax],
      extrapolate: 'clamp',
    });

  }
  render() {
    console.log(" Dimensions.get('window'):", Dimensions.get('window').width)
    return (
      <SafeAreaView style={[FlexStyles.flex1]}>
        <View
          style={[
            FlexStyles.flex1,
            FlexStyles.flexDirectioncolumn,
            FlexStyles.flexarround,
          ]}>
          <View>
            <Image
              source={require('../assets/images/logo/batwaraPreLogin.png')}
              style={[LoginStyles.logoStyle]}
            />
          </View>
          <View
            style={[
              LoginStyles.preloginCard,
              CommonStyles.commonShadowCard,
              FlexStyles.flex1,
              FlexStyles.flexDirectioncolumn,
              FlexStyles.flexBetween,
              FlexStyles.alignItems,
            ]}>
            <View style={[CommonStyles.p20]}>
              <Text
                style={[
                  {
                    fontFamily: 'Inter-Bold',
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: '#20315f',
                  },
                ]}>
               {splashHeader}
              </Text>
              <Text
                style={[
                  CommonStyles.pt10,
                  {
                    fontFamily: 'Roboto-Regular',
                    fontWeight: 100,
                    fontSize: 15,
                    color: '#666',
                  },
                ]}>
                {splashTitle}
              </Text>
            </View>
            <View
              style={[LoginStyles.outerSlider, CommonStyles.commonShadowCard]}>
              <Animated.View
                style={{
                  

                  transform: [
                    {translateX: this.clampedPan},
                    // {translateY: this.pan.y},
                  ],
                }}
                {...this.panResponder.panHandlers}>
                <View style={[LoginStyles.loginArrow]}></View>
              </Animated.View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default Splashscreen;
