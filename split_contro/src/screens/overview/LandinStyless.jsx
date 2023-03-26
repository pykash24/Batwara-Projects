import {StyleSheet, Dimensions, Platform} from 'react-native';
import {Colors} from '../../constants/Colors.js';
const {width, height} = Dimensions.get('window');
const LandingStyles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
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

    borderColor: Colors.orange,
  },
  tabStyles: {
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
  },
  tabText: {
    color: Colors.commonBlack,
  },
  tabBackground: {
    backgroundColor:  Colors.orange,
    margin:10,
    padding:5,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,

  },
  searchbar: {
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor:  Colors.orange,
    padding: 5,
  },
  searchTextbar: {
    width: width / 1.6,
  },
});
export default LandingStyles;
