import { StyleSheet, Dimensions, Platform } from 'react-native';
// import ColorStyles from '../Color/ColorStyles';
import { Colors } from '../../constants/Colors.js';

const { width, height } = Dimensions.get('window');

const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    height: height,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 20,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
  },

  //--------Padding-----------------
  p5: {
    padding: 5,
  },
  p10: {
    padding: 10,
  },
  p15: {
    padding: 15,
  },
  p20: {
    padding: 20,
  },
  p25: {
    padding: 25,
  },
  p30: {
    padding: 30,
  },
  p35: {
    padding: 35,
  },

  //--------Margin Left-----------------
  ml5: {
    marginLeft: 5,
  },
  ml10: {
    marginLeft: 10,
  },
  ml15: {
    marginLeft: 15,
  },
  ml20: {
    marginLeft: 20,
  },
  ml25: {
    marginLeft: 25,
  },
  ml30: {
    marginLeft: 30,
  },
  ml35: {
    marginLeft: 35,
  },

  //--------Margin Top-----------------
  mt5: {
    marginTop: 5,
  },
  mt10: {
    marginTop: 10,
  },
  mt15: {
    marginTop: 15,
  },
  mt20: {
    marginTop: 20,
  },
  mt25: {
    marginTop: 25,
  },
  mt30: {
    marginTop: 30,
  },
  mt35: {
    marginTop: 35,
  },

  //--------Border radius-----------------
  br5: {
    borderRadius: 5,
  },
  br10: {
    borderRadius: 10,
  },
  br15: {
    borderRadius: 15,
  },
  br20: {
    borderRadius: 20,
  },
  br25: {
    borderRadius: 25,
  },

  //--------Width-----------------
  w90: {
    width: width / 1.5,
  },
  w10: {
    width: 10,
  },
  m5: {
    margin: 5,
  },
  m10: {
    margin: 10
  },
  mr10: {
    marginRight: 10
  },
  mr20: {
    marginRight: 20
  },
  p20: {
    padding: 20,
  },
  p10: {
    padding: 10,
  },
  pt10: {
    paddingTop: 10,
  },
  mb30: {
    marginBottom: 30
  },
  mv20: {
    marginVertical: 20,
  },
  gap10: {
    gap: 10
  },
  gap20: {
    gap: 20
  },

  commonShadowCard: {
    backgroundColor: Colors.commonShadodowBackground,
    shadowColor: Colors.commonCardShadodow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
});
export default CommonStyles;
