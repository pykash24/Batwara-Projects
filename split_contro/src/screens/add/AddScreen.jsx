import { Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TextFeild from '../../components/TextFeild'
import { Colors } from '../../constants/Colors'
import FontAwesomIcon from 'react-native-vector-icons/FontAwesome5';
import checked from '../../assets/images/commonImage/checkedCircle.png'
import calendar from '../../assets/images/commonImage/calendar.png'
import group from '../../assets/images/commonImage/group-m.png'
import { useNavigation } from '@react-navigation/native';
import FlexStyles from '../../assets/Styles/FlexStyles';
import camera from '../../assets/images/commonImage/camera.png'
import amount from '../../assets/images/commonImage/amount.png'
import bill from '../../assets/images/commonImage/bill.png'
import splitEqual from '../../assets/images/commonImage/splitEqual.png'

const AddScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
    <View style={styles.container}>
      <View style={[styles.header, FlexStyles.flexDirectioncolumn]}>
        <View style={[FlexStyles.flexDirectionrow, FlexStyles.alignItems, FlexStyles.flexBetween]}>
          <TouchableOpacity style={[FlexStyles.flexDirectionrow, styles.gap15,]} onPress={() => navigation.goBack()}>
            <FontAwesomIcon name="arrow-left" color={Colors.white} size={20} />
            <TextFeild
              type={"heading"} color={Colors.white}
              value={"Add Expense"} />
          </TouchableOpacity>
          <TouchableOpacity >
            <Image source={checked} style={styles.checked} />
          </TouchableOpacity>
        </View>
        <View style={[styles.searchOuterView, styles.mt20, styles.pl20]}>
          <FontAwesomIcon name="search" color={Colors.grey1} size={14} />
          <TextInput placeholder='search by group name'
            style={[styles.searchInput]} />
        </View>
      </View>
      <KeyboardAvoidingView style={[styles.mainView, FlexStyles.flexDirectioncolumn]}>
      {/* <View > */}
        <View style={[styles.round1]}>
          <View style={[styles.whiteRound]} />
        </View>
        <View style={[styles.round2]}>
          <View style={[styles.whiteRound]} />
        </View>
        <View style={[styles.round3]}>
          <View style={[styles.whiteRound]} />
        </View>
        <View style={[styles.round4]}>
          <View style={[styles.whiteRound]} />
        </View>


        <View style={styles.mainViewChild1}>
          <TouchableOpacity style={[FlexStyles.justifyContainCenter, FlexStyles.alignItems]}>
            <Image source={camera} style={styles.camera} />
          </TouchableOpacity>
        </View>
        <View style={styles.mainViewChild2}>
          <View style={[FlexStyles.flexDirectionrow, FlexStyles.alignItems, styles.gap15]}>
            <TouchableOpacity style={[FlexStyles.justifyContainCenter, FlexStyles.alignItems, styles.whiteCircle]}>
              <Image source={bill} style={styles.footerIcon} />
            </TouchableOpacity>
            <View style={[styles.searchOuterView, styles.pl10]}>
              <TextInput placeholder='Enter bill or item name'
                style={[styles.searchInput, styles.width100]} />
            </View>
          </View>
          <View style={[FlexStyles.flexDirectionrow, FlexStyles.alignItems, styles.gap15]}>
            <TouchableOpacity style={[FlexStyles.justifyContainCenter, FlexStyles.alignItems, styles.whiteCircle]}>
              <Image source={amount} style={styles.footerIcon} />
            </TouchableOpacity>
            <View style={[styles.searchOuterView, styles.pl10]}>
              <TextInput placeholder='0.00'
                style={[styles.searchInput, styles.width100]} />
            </View>
          </View>
          <View style={[FlexStyles.flexDirectionrow, FlexStyles.alignItems, styles.gap15]}>
            <TouchableOpacity style={[FlexStyles.justifyContainCenter, FlexStyles.alignItems, styles.whiteCircle]}>
              <Image source={splitEqual} style={styles.footerIcon} />
            </TouchableOpacity>
            <View style={[styles.searchOuterView, styles.pl10]}>
              <TextInput placeholder='Split by equality'
                style={[styles.searchInput, styles.width100]} />
            </View>
          </View>
        </View>
      {/* </View> */}
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <View style={[FlexStyles.flexDirectioncolumn]}>
          <TouchableOpacity style={[FlexStyles.justifyContainCenter, FlexStyles.alignItems]}>
            <Image source={group} style={styles.footerIcon} />
          </TouchableOpacity>
          <TextFeild
            color={Colors.white}
            value={"Choose Group"} />
        </View>
        <View tyle={[FlexStyles.flexDirectioncolumn,]}>
          <TouchableOpacity style={[FlexStyles.justifyContainCenter, FlexStyles.alignItems]}>
            <Image source={calendar} style={styles.footerIcon} />
          </TouchableOpacity>
          <TextFeild
            color={Colors.white}
            value={"Choose Group"} />
        </View>
      </View>
    </View >
    </SafeAreaView>
  )
}

export default AddScreen

const styles = StyleSheet.create({
  container: {
    position:'relative',
    display: 'flex',
    color: 'black',
    height: '100%',
    position: "relative",
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor:Colors.white
  },
  header: {
    padding: 15,
    backgroundColor: Colors.primary,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20
  },
  footer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainView: {
    backgroundColor: Colors.gray3,
    height: '70%',
    margin: 15,
    position: 'relative',
    alignItems: 'center'
  },
  mainViewChild1: {
    // position: 'absolute',
    marginTop: '10%',
    // marginLeft: '38%',
    // justifyContent:'center',
    width: 90,
    height: 90,
    backgroundColor: Colors.white,
    borderRadius: 100
  },
  mainViewChild2: {
    // position: 'absolute',
    marginTop: '20%',
    gap: 12,
    paddingLeft:10
  },
  whiteCircle: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  camera: {
    width: 50,
    height: 50,
    marginTop: 15
  },
  circle: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  checked: {
    width: 25,
    height: 25
  },
  gap15: {
    gap: 15
  },
  width100: {
    width: '75%'
  },
  searchOuterView: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 40,
    alignItems: 'center',
    // paddingVertical: 2,
    // paddingLeft: 20,
  },
  pl20: {
    paddingLeft: 20
  },
  pl10: {
    paddingLeft: 10
  },
  mt20: {
    marginTop: 20
  },
  searchInput: {
    fontSize: 15,
    color: Colors.black,
    paddingHorizontal: 10
  },
  whiteRound: {
    width: 50,
    height: 50,
    borderRadius:100,
    zIndex:-90,
    backgroundColor: Colors.white,
  },
  round1: {
    position: 'absolute',
    top: '15%',
    left:-20

  },
  round2: {
    position: 'absolute',
    top: '15%',
    right:-20
  },
  round3: {
    position: 'absolute',
    bottom: '15%',
    left:-20
  },
  round4: {
    position: 'absolute',
    bottom: '15%',
    right:-20

  }

})