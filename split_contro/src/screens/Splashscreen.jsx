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
const {width, height} = Dimensions.get('window');

class Splashscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  pan = new Animated.ValueXY();
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, {dx: this.pan.x, dy: this.pan.y}],
      {useNativeDriver: false},
    ),
    onPanResponderRelease: () => {
      Animated.spring(this.pan, {
        toValue: {x: 0, y: 0},
        useNativeDriver: true,
      }).start();
      console.log('onPanResponderRelease called');
      console.log('this.pan.x:', this.pan.x._value);
      console.log('width:', width);
      if (this.pan.x._value > '170') {
        this.props.navigation.navigate('Login');
      } else {
        console.log('move again');
      }
    },
  });
  render() {
    return (
      <SafeAreaView style={[FlexStyles.flex1]}>
        <View
          style={[
            FlexStyles.flex1,
            FlexStyles.flexDirectioncolumn,
            FlexStyles.flexarround,
            // FlexStyles.alignItems,
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
                Split bills made easy with Batwara!
              </Text>
              <Text style={[CommonStyles.pt10,{
                    fontFamily: 'Roboto-Regular',
                    fontWeight: 100,
                    fontSize: 15,
                    color: '#666',
                  },]}>
                Say goodbye to the headache of splitting bills - with Batwara,
                it's as easy as pie and you can keep your cool!
              </Text>
            </View>
            <View
              style={[LoginStyles.outerSlider, CommonStyles.commonShadowCard]}>
              <Animated.View
                style={{
                  transform: [
                    {translateX: this.pan.x},
                    {translateY: this.pan.y},
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
// const Splashscreen = ({navigation}) => {
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//       }}>
//       <View style={{marginTop: 20}}>
//         <Text
//           style={{
// fontFamily: 'Inter-Bold',
// fontWeight: 'bold',
// fontSize: 30,
// color: '#20315f',
//           }}>
//           BATWARA
//         </Text>
//       </View>
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
//       <Image source={userprofile}  style={{width:300,height:300, resizeMode: 'contain',
// }}/>

//       </View>
//       <TouchableOpacity
//         style={{
//           backgroundColor: Colors.primary,
//           padding: 20,
//           width: '90%',
//           borderRadius: 10,
//           marginBottom: 50,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//         }}
//         onPress={() => navigation.navigate('Login')}>
//         <Text
//           style={{
//             color: 'white',
//             fontSize: 18,
//             textAlign: 'center',
//             fontWeight: 'bold',
//             fontFamily: 'Roboto-MediumItalic',
//           }}>
//           Let's Begin
//         </Text>
//         <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default Splashscreen;
