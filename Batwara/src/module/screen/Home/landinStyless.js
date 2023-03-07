import {StyleSheet, Dimensions, Platform} from 'react-native';
import {Colors} from '../../../assets/Color/ColorStyles.js';
const {width, height} = Dimensions.get('window');
const LandingStyles = StyleSheet.create({
  card: {
    backgroundColor: '#ffff',
    borderRadius: 18,
    margin: 5,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bottomWidth: {
    // borderWidth:10,
    borderBottomWidth: 6,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginLeft: 10,
    marginRight: 10,

    borderColor: '#F17120',
  },
  tabStyles: {
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
  },
  tabText: {
    color: '#F17120',
  },
  searchbar: {
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#F17120',
    padding: 5,
    // width: width/1.5
  },
  searchTextbar: {
    width: width / 1.6,
    // width:90
    // borderWidth:1,
  },

  // container: {
  //   flex: 1,
  //   backgroundColor:'#F5F5F5',
  //   height:height
  // },
  // inner: {
  //   flex: 1,
  //   justifyContent: 'space-around',
  // },
  // header: {
  //   fontSize: 20,
  //   marginBottom: 48,
  // },
  // textInput: {
  //   height: 40,
  //   borderColor: '#000000',
  //   borderBottomWidth: 1,
  //   marginBottom: 36,
  // },
  // btnContainer: {
  //   backgroundColor: 'white',
  //   // marginTop: 12,
  // },
});
export default LandingStyles;
