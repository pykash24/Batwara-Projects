import {StyleSheet, Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
// import ColorStyles from '../../../assets/Color/ColorStyles';
import { Colors } from '../constants/Colors.js';
const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  registrationCard: {
    backgroundColor: '#E9EFF6',
    margin: 10,
    padding: 5,
  },
  headerTitle: {
    fontSize: 32,
  },
  headerDescription: {
    fontSize: 16,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
  logoStyle: {
    height: height / 2.5,
    width: width,
    resizeMode: 'center',
  },
  loginArrow: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    margin: 5,
    borderWidth: 2,
    borderColor: Colors.orange,
    borderStyle: 'solid',
    justifyContent: 'center',
    backgroundColor: 'white', //Colors.orange,
  },
  loginArrowImg: {
    height: 17,
    width: 'auto',
    resizeMode: 'center',
  },
  outerSlider: {
    margin: 20,
    width: width - 100,
    height: 55,
    borderRadius: 25,
    // borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    justifyContent: 'center',
    backgroundColor: Colors.grey,
  },
  preloginCard: {
    backgroundColor: 'white',
    height: height / 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  preloginText: {
    padding:20
  },
  preloginText1: {
    paddingBottom:10
  }
});

export default LoginStyles;
