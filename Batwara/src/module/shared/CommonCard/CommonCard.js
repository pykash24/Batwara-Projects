import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  SafeAreaView,
  Image,
} from 'react-native';
import CommonCardStyles from './CommonCardStyles';
import FlexStyles from '../../../assets/Styles/FlexStyles';

class CommonCard extends Component {
  render() {
    return (
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
                <Text style={[CommonCardStyles.cardImage]}>Image</Text>
              </View>
              <View style={[CommonCardStyles.cardTitle,FlexStyles.flexDirectioncolumn]}>
                <Text>Title</Text>
                <Text>Title</Text>
                <Text>Title</Text>
                <View style={[FlexStyles.flexDirectionrow]}>
                  <Text>Send Split</Text>
                  <Text>5000</Text>
                </View>
              </View>
              <View>
                <Text>Date Text</Text>
              </View>
          </View>
        </View>
      </View>
    );
  }
}
export default CommonCard;

{
  /* <View style={[FlexStyles.flexDirectioncolumn]}>
                <Text>Heading Text</Text>
                <Text>details Text</Text>
              </View> */
}
