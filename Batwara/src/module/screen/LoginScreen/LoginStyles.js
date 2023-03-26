import {StyleSheet, Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import ColorStyles from '../../../assets/Color/ColorStyles';
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
    width: width - 50,
    resizeMode: 'center',
  },
  loginArrow: {
    width: 70,
    height: 70,
    borderRadius: 35,
    // borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    justifyContent: 'center',
    backgroundColor: ColorStyles.orange,
  },
  loginArrowImg: {
    height: 17,
    width: 'auto',
    resizeMode: 'center',
  },
});

export default LoginStyles;
