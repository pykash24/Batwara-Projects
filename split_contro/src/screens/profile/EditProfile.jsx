import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import DefaultUser from '../../assets/images/DefaultUser.png';
import RadioBtnActive from '../../assets/images/RadioBtnActive.png';
import RadioBtnInactive from '../../assets/images/RadioBtnInactive.png';
import { Title, SubTitle, FullName, Address, EnterOTP, EmailId, Gender, MobileNo, InputTypeMobile, InputTypeEmail } from '../../constants/labels/Profile/EditProfileLabels';
import { Colors } from '../../constants/Colors';
import FloatingTextInput from '../../components/textInput/FloatingTextInput';
import CommonStyles from '../../assets/Styles/CommonStyles';
import FlexStyles from '../../assets/Styles/FlexStyles';
import CustomButton from '../../components/CustomButton';

const EditProfile = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const GenderData = [
    { label: 'Male', value: '0' },
    { label: 'Female', value: '1' },
    { label: 'Other', value: '2' },
  ];
  const [selectedGender, setSelectedGender] = useState('0');

  const fullNameFunction = (text) => {
    setFullName(text);
    console.log('Full name text----->', text);
  };

  const setAddressFunction = (text) => {
    setAddress(text);
    console.log('Address text----->', text);
  };
  const setEmailFunction = (text) => {
    setEmail(text);
    console.log('Email text----->', text);
  };
  const setMobileFunction = (number) => {
    setMobile(number);
    console.log('Mobile number----->', number);
  };

  const handlePress = (option) => {
    setSelectedGender(option);
  };

  const sendOTPFunction = (data) => {
    console.log('sendOtp called:', data);
  };

  return (
    <View style={styles.Container}>
      <View style={styles.FirstSection}>
        <Image source={DefaultUser} style={styles.ImageSize} />
      </View>

      <View style={styles.SecondSection}>
        <View style={CommonStyles.p10}>
          <View>
            <Text style={styles.TitleText}>{Title}</Text>
          </View>
          <View>
            <Text style={styles.SubTitleText}>{SubTitle}</Text>
          </View>

          <View>
            <View style={[styles.TextInputContainer, CommonStyles.mt15]}>
              <FloatingTextInput
                label={FullName}
                value={fullName}
                keyboardType="default"
                maxLength={50}
                setNumber={fullNameFunction}
                onChangeText={setFullName} />
            </View>

            <View style={[CommonStyles.mt15, FlexStyles.flexDirectionrow, FlexStyles.flexarround]}>
              {GenderData.map((option) => (
                <View key={option.value} style={[CommonStyles.m5,]}>
                  <TouchableOpacity onPress={() => handlePress(option.value)}>
                    <View style={[FlexStyles.flexDirectionrow]}>
                      <Image
                        source={selectedGender === option.value ? RadioBtnActive : RadioBtnInactive}
                        style={styles.RadioBtnSize}
                      />
                      <Text style={selectedGender === option.value ? [styles.RadioLabelActive, CommonStyles.ml5] : [styles.RadioLabelInactive, CommonStyles.ml5]}>{option.label}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={[styles.TextInputContainer, CommonStyles.mt15]}>
              <FloatingTextInput
                label={MobileNo}
                value={mobile}
                OTPButton={true}
                keyboardType="numeric"
                maxLength={10}
                onPress={sendOTPFunction}
                setNumber={setMobileFunction}
              />
            </View>

            <View style={[styles.TextInputContainer, CommonStyles.mt15]}>
              <FloatingTextInput
                label={EmailId}
                value={email}
                OTPButton={true}
                keyboardType="default"
                maxLength={25}
                onPress={sendOTPFunction}
                setNumber={setEmailFunction}
              />
            </View>

            <View style={[styles.TextAreaInput, CommonStyles.mt15]}>
              <FloatingTextInput
                label={Address}
                value={address}
                keyboardType="default"
                maxLength={250}
                setNumber={setAddressFunction}
              />
            </View>

          </View>
        </View>
        <View style={styles.UpdateButtonStyles}>
          <CustomButton
            label={'UPDATE'}
            loading={true}
            onPress={() => { navigation.navigate('Main') }}
          /></View>
      </View >
    </View >
  )
}

export default EditProfile

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    flexDirection: 'column',
  },
  FirstSection: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  SecondSection: {
    flex: 2.5,
    backgroundColor: '#FBFCFD',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    elevation: 7,
  },
  ImageSize: {
    padding: 45,
    borderColor: 'orange',
    borderWidth: 2,
    resizeMode: 'contain',
    borderRadius: 100,
    height: 90,
    width: 90,
  },
  RadioBtnSize: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  TitleText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '700',
    color: Colors.commonTextBlack,
    textAlign: 'center',
    paddingTop: 10,
  },
  SubTitleText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '400',
    color: Colors.commonTextBlack,
    padding: 10,
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
  RadioLabelActive: {
    fontFamily: 'Roboto-Medium',
    color: Colors.commonTextBlack,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 17,
    borderRadius: 5,
    padding: 1.8,
  },
  RadioLabelInactive: {
    fontFamily: 'Roboto-Medium',
    color: Colors.CommonTextGrey,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 17,
    borderRadius: 5,
    padding: 1.8,
  },
  UpdateButtonStyles: {
    position: 'absolute',
    left: "26.5%", 
    bottom: 5,
  }
});