import {StyleSheet, Dimensions, Platform} from 'react-native';
import {Colors} from '../constants/Colors.js';
const {width, height} = Dimensions.get('window');

const CommonCardStyles = StyleSheet.create({
  cardStyle: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: Colors.grey2,
    // borderLeftWidth: 5,
    // borderLeftColor:'blue',
    // borderTopRightRadius: 5,
    // borderBottomRightRadius: 5,
  },
  cardBorderStyle: {
    width: 3,
    backgroundColor: 'blue',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    // marginTop: 10,
    // marginBottom: 10,
    marginRight: 7,
  },
  cardImage: {
    width: 60,
    height: 100,
    backgroundColor: 'red',
  },
  cardTitle: {
    width: width / 1.9,
    backgroundColor: 'yellow',
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
    width: width / 1.8,
  },
  grpPeople: {
    height: 25,
    width: 25,
    resizeMode: 'center',
  },
  verticalBar:{
    width: 3, 
    height:30,
    backgroundColor: 'black'
  },
  mr10:{
    marginRight:10
  }
});
export default CommonCardStyles;
