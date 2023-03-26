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
  textAlignCenter: {
    textAlign: 'center',
  },
  alignItems: {
    alignItems: 'center',
  },
  flexBetween: {
    justifyContent: 'space-between',
  },
  flexarround: {
    justifyContent: 'space-around',
  },
});

export default FlexStyles;
