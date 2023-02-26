import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Animated,
  Dimensions
} from 'react-native';
import FlexStyles from '../../assets/Styles/FlexStyles'
import CommonStyles from '../../assets/Styles/CommonStyles'
const {width, height} = Dimensions.get('window');
class CommonButton extends Component {
  render() {
    const {title, onPress} = this.props;
    return (
      <View style={[FlexStyles.flexDirectionrow,FlexStyles.dflex,FlexStyles.justifyContainCenter]}>
      <TouchableOpacity
        style={[CommonButtonStyles.buttonStyle, FlexStyles.flexDirectionrow, FlexStyles.justifyContainCenter, CommonButtonStyles.btnSty]}
        onPress={() => onPress()}
        underlayColor="#fff">
        <Text style={[CommonButtonStyles.titleStyle, FlexStyles.textAlignCenter]}>{title}</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const CommonButtonStyles = StyleSheet.create({
  buttonStyle: {
    backgroundColor:'#F17120',
  },
  titleStyle:{
      color:'white',
      padding:10,
  },
  btnSty: {
    // margin: 50,
    width:width/1.5,
    borderRadius:10,
    fontSize: 12,
  }

});

export default CommonButton;
