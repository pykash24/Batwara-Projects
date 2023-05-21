




































import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import TabContainer from '../../components/TabContainer';
import FlexStyles from '../../assets/Styles/FlexStyles';
import CommonStyles from '../../assets/Styles/CommonStyles';
import CommonCard from '../../shared/CommonCard';
import { homeActions } from '../../store/slice/HomeSlice';
import { useDispatch, useSelector } from 'react-redux';
import LandingStyles from './LandinStyless';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const registerCTX = useSelector((state) => state.register);

  const [active, setActive] = useState('GE');
  const dispatch=useDispatch()
  const navigation=useNavigation()
  const changeTab = TabType => {
    if (TabType === 'GE') {
      setActive('GE');
    } else {
      setActive('PE');
    }
  };
  useEffect(()=>{
    dispatch(homeActions.setIsTab(false));
    if(registerCTX?.isLoggedIn==false){
      navigation.navigate("Splash")
    }
    else{
      navigation.navigate("Main")
    }
  },[])
  const data = [
    {title: 'Lonavala Trekking', date: 'sat-20-2022', name: 'Mahesh Shendage', totalPerson: '5', totalCost: '5000'},
    {title: 'Pagoda Temple', date: 'sat-20-2022', name: 'Nishant Nandeshwar', totalPerson: '2', totalCost: '10000'},
    {title: 'Goa', date: 'sat-29-2023', name: 'Vikas Tomar', totalPerson: '3', totalCost: '30000'},
  ];
  return (
    <TabContainer>
      <View
        style={[
          FlexStyles.dflex,
          LandingStyles.card,
          LandingStyles.whiteCardHeight,
        ]}>
        <View
          style={[
            FlexStyles.flexDirectionrow,
            FlexStyles.flexarround,
            FlexStyles.alignItems,
          ]}>
          <TouchableOpacity
            onPress={() => changeTab('GE')}
            style={
              active === 'GE'
                ? [LandingStyles.tabActiveBackground, LandingStyles.tabTop]
                : [LandingStyles.tabInactiveBackground, LandingStyles.tabTop]
            }>
            <Text style={[LandingStyles.tabStyles, LandingStyles.tabText]}>
              Group Expenses
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeTab('PE')}
            style={
              active === 'PE'
                ? [LandingStyles.tabActiveBackground, LandingStyles.tabTop]
                : [LandingStyles.tabInactiveBackground, LandingStyles.tabTop]
            }>
            <Text style={[LandingStyles.tabStyles, LandingStyles.tabText]}>
              Personal Expenses
            </Text>
          </TouchableOpacity>
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
          <CommonCard data= {data}/>
          {/* <CommonCard />
          <CommonCard />
          <CommonCard />
          <CommonCard />
          <CommonCard />
          <CommonCard />
          <CommonCard />
          <CommonCard /> */}
        </ScrollView>
      </View>
    </TabContainer>
  );
};

export default HomeScreen;
