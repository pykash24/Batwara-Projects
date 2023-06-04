import {StyleSheet, Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

const FlexStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  dflex: {
    display: 'flex',
  },
  flexDirectionrow: {
    flexDirection: 'row',
  },
  flexDirectioncolumn: {
    flexDirection: 'column',
  },
  justifyContainCenter: {
    justifyContent: 'center',
  },
  justifyContainend:{
    justifyContent:'flex-end'
  },
  justifyContainstart:{
    justifyContent:'flex-start'
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  alignItems: {
    alignItems: 'center',
  },  
  alignItemsStart: {
    alignItems:'flex-start',
  },
  flexBetween: {
    justifyContent: 'space-between',
  },
  flexarround: {
    justifyContent: 'space-around',
  },
  gap10:{
    gap:10
  },
  gap5:{
    gap:5
  }
});

export default FlexStyles;
