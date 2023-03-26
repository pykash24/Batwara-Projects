import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import CommonCardStyles from './CommonCardStyles';
import FlexStyles from '../assets/Styles/FlexStyles';
const {width, height} = Dimensions.get('window');
class CommonCard extends Component {
  render() {
    return (
      <>
        <View
          style={[
            CommonCardStyles.cardStyle,
            FlexStyles.flexDirectionrow,
            FlexStyles.dflex,
          ]}>
          <Text style={[CommonCardStyles.cardBorderStyle]}></Text>
          <View style={[FlexStyles.flexDirectionrow]}>
            <View style={[FlexStyles.flexBetween, FlexStyles.flexDirectionrow]}>
              <View>
                <Image
                  source={require('../assets/images/homescreen/roundtable.png')}
                  style={[{width: 50, height: 50, resizeMode: 'center'}]}
                />
              </View>
              <View
                style={[
                  CommonCardStyles.cardTitle,
                  FlexStyles.flexDirectioncolumn,
                ]}>
                <Text>Lonavala Trekking</Text>
                <View
                  style={[FlexStyles.flexDirectionrow, FlexStyles.flexarround]}>
                  <View style={[FlexStyles.flexDirectionrow]}>
                    <Image
                      source={require('../assets/images/homescreen/userAvatar.png')}
                      style={[{width: 20, height: 20, resizeMode: 'center'}]}
                    />
                    <Text>Person</Text>
                  </View>
                  <View style={[FlexStyles.flexDirectionrow]}>
                    <Image
                      source={require('../assets/images/homescreen/group.png')}
                      style={[{width: 20, height: 20, resizeMode: 'center'}]}
                    />
                    <Text>5</Text>
                  </View>
                </View>
              </View>
              <View>
                <Text>Sat-20-March</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={[
            FlexStyles.flexDirectionrow,
            FlexStyles.justifyContainCenter,
            FlexStyles.dflex1,
          ]}>
          <View style={[{borderWidth: 1, width: width - 70}]}></View>
        </View>
        <View
          style={[
            CommonCardStyles.cardStyle,
            FlexStyles.flexDirectionrow,
            FlexStyles.dflex,
          ]}>
          <Text style={[CommonCardStyles.cardBorderStyle]}></Text>
          <View style={[FlexStyles.flexDirectionrow]}>
            <View style={[FlexStyles.flexBetween, FlexStyles.flexDirectionrow]}>
              <View>
               <Text>Images</Text>
              </View>
              <View>
                <Text>Send Splite</Text>
              </View>
              <View>
                <Text>R 5000</Text>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
}
export default CommonCard;
