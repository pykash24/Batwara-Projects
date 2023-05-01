import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import CommonHeaderImage from '../../assets/images/CommonHeaderImage.png';
import { Title, SubTitle, FullName, Address, EnterOTP, EmailId, Gender } from '../../constants/labels/Profile/EditProfileLabels';
import { Colors } from '../../constants/Colors';
import FloatingTextInput from '../../components/textInput/FloatingTextInput';
import CommonStyles from '../../assets/Styles/CommonStyles';
import CommonRadioButton from '../../components/radioButton/CommonRadioButton';

const EditProfile = () => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.Container}>
      <View style={styles.FirstSection}>
        <Image source={CommonHeaderImage} style={styles.ImageSize} />
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
                onChangeText={setFullName} />
            </View>

            <View style={[styles.TextInputContainer, CommonStyles.mt15]}>
              <FloatingTextInput
                label={"Address"}
                value={address}
                onChangeText={setAddress} />
            </View>

            <View style={[styles.TextInputContainer, CommonStyles.mt15]}>
              <FloatingTextInput
                label="Mobile Id"
                value={mobile}
                onChangeText={setMobile} />
            </View>

            <View style={[styles.TextInputContainer, CommonStyles.mt15]}>
              <FloatingTextInput
                label={'Email Id'}
                value={email}
                onChangeText={setEmail} />
            </View>

          </View>
        </View>

      </View>
    </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  SecondSection: {
    flex: 2.2,
    backgroundColor: '#FBFCFD',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    elevation: 7,
  },
  ImageSize: {
    height: '100%',
    width: '100%',
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
  label: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 17,
    color: 'red',
    borderRadius: 5,
    padding: 1.8,
  },
});