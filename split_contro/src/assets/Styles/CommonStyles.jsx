import {StyleSheet, Dimensions, Platform} from 'react-native';
// import ColorStyles from '../Color/ColorStyles';
import { Colors } from '../../constants/Colors.js';

const {width, height} = Dimensions.get('window');

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
  w90: {
    width: width / 1.5,
  },
  w10: {
    width: 10,
  },
  m5: {
    margin: 5,
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

  commonShadowCard: {
    backgroundColor: Colors.commonShadodowBackground,
    shadowColor: Colors.commonCardShadodow,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
});
export default CommonStyles;
