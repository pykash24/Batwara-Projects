import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import TabContainer from '../../components/TabContainer';
import {Colors} from '../../constants/Colors';

import FlexStyles from '../../assets/Styles/FlexStyles';
import LandingStyles from './LandinStyless';
import CommonStyles from '../../assets/Styles/CommonStyles';
import CommonCard from '../../shared/CommonCard';
const HomeScreen = () => {
  return (
    <TabContainer>
      <View style={[FlexStyles.dflex, LandingStyles.card]}>
        <View
          style={[
            FlexStyles.flexDirectionrow,
            FlexStyles.flexarround,
            FlexStyles.alignItems,
          ]}>
          <View style={[LandingStyles.tabBackground]}>
            <Text style={[LandingStyles.tabStyles, LandingStyles.tabText]}>
              Group Expenses
            </Text>
          </View>
          <View>
            <Text style={[LandingStyles.tabStyles, LandingStyles.tabText]}>
              Personal Expenses
            </Text>
          </View>
        </View>
        <View
          style={[
            FlexStyles.flexDirectionrow,
            FlexStyles.flexBetween,
            CommonStyles.m10,
            FlexStyles.alignItems,
          ]}>
          <View>
            <Text>This Month</Text>
          </View>
          <View>
            <Image
              source={require('../../assets/images/commonImage/filter.png')}
              style={[{width: 30, height: 30}]}
            />
          </View>
        </View>
        <ScrollView>
          <CommonCard />
          <CommonCard />
          <CommonCard />
          <CommonCard />
          <CommonCard />
          <CommonCard />
          <CommonCard />
          <CommonCard />
          <CommonCard />
        </ScrollView>
      </View>
    </TabContainer>
  );
};

export default HomeScreen;
