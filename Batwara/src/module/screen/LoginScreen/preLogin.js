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
import FlexStyles from '../../../assets/Styles/FlexStyles';
import LoginStyles from './LoginStyles';
import CommonStyles from '../../../assets/Styles/CommonStyles';
class Prelogin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <SafeAreaView style={[FlexStyles.flex1]}>
        <View
          style={[
            FlexStyles.flex1,
            FlexStyles.flexDirectioncolumn,
            FlexStyles.flexarround,
            FlexStyles.alignItems,
          ]}>
          <View>
            <Image
              source={require('../../../assets/images/logo/batwaralogo1.png')}
              style={[LoginStyles.logoStyle]}
            />
          </View>
          <View>
            <TouchableOpacity
              style={[LoginStyles.loginArrow]}
              onPress={() => this.props.navigation.navigate('Login')}
              // onPress={() =>
              //   this.props.navigation.navigate('Details', { name: 'Custom Details header' })
              // }
            >
              <Image
                source={require('../../../assets/images/logo/Arrow1.png')}
                style={[LoginStyles.loginArrowImg, FlexStyles.textAlignCenter]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default Prelogin;
