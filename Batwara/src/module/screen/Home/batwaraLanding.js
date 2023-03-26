import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import FlexStyles from '../../../assets/Styles/FlexStyles';
import LandingStyles from './landinStyless';
import CommonStyles from '../../../assets/Styles/CommonStyles';
import CommonCard from '../../shared/CommonCard/CommonCard.js';
import {search} from '../../../assets/images/commonImage/search.png';
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
        <View style={[FlexStyles.dflex, LandingStyles.card]}>
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
              FlexStyles.flexarround,
            ]}>
            <View
              style={[
                FlexStyles.flexDirectionrow,
                LandingStyles.searchbar,
                FlexStyles.alignItems,
                FlexStyles.flexarround,
              ]}>
              <TextInput
                style={LandingStyles.searchTextbar}
                onChangeText={text => this.setState({filter: text})}
                value={this.state.filter}
                placeholder="Search here..."
                // keyboardType="text"
              />
              <Image
                source={require('../../../assets/images/commonImage/search.png')}
                style={[{width: 30, height: 30}]}
              />
            </View>
            <View style={[LandingStyles.card]}>
              <Image
                source={require('../../../assets/images/commonImage/filter.png')}
                style={[{width: 30, height: 30}]}
              />
            </View>
          </View>
          <ScrollView>
            <CommonCard />
            <CommonCard />
            <CommonCard />
            <CommonCard />
          </ScrollView>
        </View>
      </>
    );
  }
}
export default Batwaralanding;
