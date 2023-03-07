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
import LandingStyles from './landinStyless';
class Batwaralanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
    };
  }
  
  render() {
    return (
      <>
        <View style={[FlexStyles.flex1]}>
          <View style={[FlexStyles.flexDirectionrow, FlexStyles.flexarround]}>
            <View>
              <Text style={[LandingStyles.tabStyles, LandingStyles.tabText]}>
                Group Expenses
              </Text>
              <View style={[LandingStyles.bottomWidth]}></View>
            </View>
            <View>
              <Text style={[LandingStyles.tabStyles, LandingStyles.tabText]}>
                Personal Expenses
              </Text>
              <View style={[LandingStyles.bottomWidth]}></View>
            </View>
          </View>
          <View
            style={[
              FlexStyles.flexDirectionrow,
              FlexStyles.alignItems,
              // FlexStyles.flexarround,
            ]}>
            <View
              style={[
                FlexStyles.flexDirectionrow,
                LandingStyles.searchbar,
                FlexStyles.alignItems,
              ]}>
              <TextInput
                style={LandingStyles.searchTextbar}
                onChangeText={text => this.setState({filter: text})}
                value={this.state.filter}
                placeholder="Search here..."
                keyboardType="text"
              />
              <Text>Search</Text>
              {/* <Image
                source={require('../../../assets/images/commonImage/search.png')}
                style={{}}
              /> */}
            </View>
            <View>
              <Text>Filter</Text>
              {/* <Image
                source={require('../../../assets/images/commonImage/search.png')}
                style={{}}
              /> */}
            </View>
          </View>
        </View>
      </>
    );
  }
}
export default Batwaralanding;
