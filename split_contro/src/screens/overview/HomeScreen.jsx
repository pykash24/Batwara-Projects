import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, } from 'react-native';
import TabContainer from '../../components/TabContainer';
import FlexStyles from '../../assets/Styles/FlexStyles';
import CommonStyles from '../../assets/Styles/CommonStyles';
import { homeActions } from '../../store/slice/HomeSlice';
import { useDispatch } from 'react-redux';
import { Colors } from '../../constants/Colors';
import { FilterValues, GroupsTabTitle, PersonalTabTitle } from '../../constants/labels/Landing/LandingScreenLabels';
import Cards from './Cards';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const [active, setActive] = useState(GroupsTabTitle);

  const dispatch = useDispatch()

  const changeTab = TabType => {
    if (TabType === GroupsTabTitle) {
      setActive(GroupsTabTitle);
    } else {
      setActive(PersonalTabTitle);
    }
  };

  useEffect(() => {
    dispatch(homeActions.setIsTab(false));
  }, [])

  return (
    <View style={styles.Container}>
      <TabContainer>
        <View style={[styles.TabMainBackground, FlexStyles.flexDirectionrow, FlexStyles.flexarround, FlexStyles.alignItems]}>
          <TouchableOpacity
            onPress={() => changeTab(GroupsTabTitle)}
            style={active === GroupsTabTitle ? [styles.ActiveTab, styles.Tab1ButtonStyles] : [styles.Tab1ButtonStyles]}>
            <Text style={active === GroupsTabTitle ? [styles.TabActiveTextStyles] : [styles.TabInactiveTextStyles]}>{GroupsTabTitle}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => changeTab(PersonalTabTitle)}
            style={active === PersonalTabTitle ? [styles.ActiveTab, styles.Tab2ButtonStyles] : [styles.Tab2ButtonStyles]}>
            <Text style={active === PersonalTabTitle ? [styles.TabActiveTextStyles] : [styles.TabInactiveTextStyles]}>{PersonalTabTitle}</Text>
          </TouchableOpacity>
        </View>

        <View style={[FlexStyles.flex1, FlexStyles.flexDirectionrow, FlexStyles.flexBetween, FlexStyles.alignItemsStart, CommonStyles.p15]}>
          <View style={CommonStyles.mt3}>
            <Text style={styles.FilterText}>{FilterValues}</Text>
          </View>
          <View>
            <Icon name="filter" style={[CommonStyles.w30, CommonStyles.h30]} size={26} color={Colors.commonBlack} />
          </View>
        </View>

        {active === GroupsTabTitle &&
          <View style={[styles.CardsSection]}>
            <ScrollView>
              <Cards />
            </ScrollView>
          </View>}

        {active === PersonalTabTitle &&
          <View style={[styles.CardsSection]}>
            <ScrollView>
              <Cards />
            </ScrollView>
          </View>}

      </TabContainer>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    flexDirection: 'column',
  },
  TabMainBackground: {
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 0,
  },
  Tab1ButtonStyles: {
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 0,
    width: '45%',
    padding: 4,
    borderRadius: 10,
  },
  Tab2ButtonStyles: {
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 5,
    width: '45%',
    padding: 4,
    borderRadius: 10,
  },
  ActiveTab: {
    backgroundColor: Colors.orange,
    elevation: 7,
  },
  TabActiveTextStyles: {
    color: Colors.white,
    marginLeft: 15,
    padding: 5,
    fontWeight: '700',
  },
  TabInactiveTextStyles: {
    color: Colors.CommonTextGrey,
    marginLeft: 15,
    padding: 5,
    fontWeight: '700',
  },
  CardsSection: {
    // backgroundColor: 'white',
    flex: 25,
    borderRadius: 10,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.commonTextBlack,
    paddingTop: 0,
  },
  SubTitleText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '400',
    color: Colors.commonTextBlack,
    padding: 10,
  },
  FilterText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '700',
    color: Colors.commonTextBlack,
  },
  TextInputContainer: {
    height: 45,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1.2,
    borderColor: Colors.commonAppBackground,
    paddingHorizontal: 10,
  },
  TextAreaInput: {
    height: 55,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1.2,
    borderColor: Colors.commonAppBackground,
    paddingHorizontal: 10,
  },
  UpdateButtonStyles: {
    position: 'absolute',
    left: "26.5%",
    bottom: 5,
  }
});