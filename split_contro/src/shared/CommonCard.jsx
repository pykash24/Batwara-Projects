import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import CommonCardStyles from './CommonCardStyles';
import FlexStyles from '../assets/Styles/FlexStyles';
import {Colors} from '../constants/Colors.js';
const {width, height} = Dimensions.get('window');

const HalfCircle = ({size, color, rotation, top, left, zIndex}) => {
  const halfSize = size / 2;
  const styles = StyleSheet.create({
    halfCircle: {
      width: size,
      height: halfSize,
      backgroundColor: color,
      borderTopLeftRadius: halfSize,
      borderTopRightRadius: halfSize,
      borderBottomRightRadius: 0,
      // borderWidth:0,
      transform: [{rotate: `${rotation}deg`}],
      position: 'absolute',
      top: top,
      left: left,
      zIndex: zIndex,
      // elevation: 3, //for ios
    },
  });

  return <View style={styles.halfCircle} />;
};

const CommonCard = props => {
  const groupPeople = [
    {id: 1, src: require('../assets/images/homescreen/male.png')},
    {id: 2, src: require('../assets/images/homescreen/female.png')},
  ];
  console.log('props:', props.data);
  return (
    <>
      {props.data.map((item, idx) => (
        <View style={[CommonCardStyles.cardStyle]} key={idx}>
          <View
            style={[
              FlexStyles.flexDirectioncolumn,
              FlexStyles.dflex,
            ]}>
            <View
              style={[
                FlexStyles.flexDirectionrow,
                FlexStyles.dflex,
                // {height: 100},
              ]}>
              <View style={[CommonCardStyles.cardBorderStyle]}></View>
              <View style={[{padding: 7}]}>
                <Image
                  source={require('../assets/images/homescreen/roundtable.png')}
                  style={[{width: 50, height: 50, resizeMode: 'center'}]}
                />
              </View>

              <View style={[FlexStyles.flexDirectioncolumn]}>
                <View style={[FlexStyles.flexDirectionrow]}>
                  <View style={[{width: width / 2.09, height: 60}]}>
                    <Text>{item.title}</Text>
                  </View>
                  <View>
                    <Text>{item.date}</Text>
                  </View>
                </View>
                <View
                  style={[
                    FlexStyles.flexDirectionrow,
                    FlexStyles.flex1,
                    FlexStyles.flexarround,
                  ]}>
                  <View style={[FlexStyles.dflex, FlexStyles.flexDirectionrow]}>
                    <Image
                      source={require('../assets/images/homescreen/userAvatar.png')}
                      style={[{width: 20, height: 20, resizeMode: 'center'}]}
                    />
                    <Text>{item.name}</Text>
                  </View>
                  <View style={[FlexStyles.dflex, FlexStyles.flexDirectionrow]}>
                    <Image
                      source={require('../assets/images/homescreen/group.png')}
                      style={[{width: 20, height: 20, resizeMode: 'center'}]}
                    />
                    <Text>{item.totalPerson}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[{borderWidth: 1, width: width - 70}]}></View>
            <View
              style={[
                FlexStyles.dflex,
                FlexStyles.flexDirectionrow,
                {height: 80},
              ]}>
              <View style={[CommonCardStyles.cardBorderStyle]}></View>
              <View>
                <HalfCircle
                  size={40}
                  color="#ffff"
                  rotation={90}
                  zIndex={10}
                  left={-20}
                  top={-10}
                />
              </View>
              <View>
                <HalfCircle
                  size={40}
                  color="#ffff"
                  rotation={270}
                  zIndex={10}
                  left={290}
                  top={-10}
                />
              </View>
              <View
                style={[
                  FlexStyles.flexDirectionrow,
                  FlexStyles.flexarround,
                  FlexStyles.flex1,
                  FlexStyles.alignItems,
                  // {width: width / 3, padding: 15, backgroundColor:'red'},
                ]}>
                <View style={[FlexStyles.flexDirectionrow]}>
                  {groupPeople.map((image, id) => (
                    <Image
                      source={image.src}
                      key={id}
                      style={[CommonCardStyles.grpPeople]}
                    />
                  ))}
                </View>
                <View style={[CommonCardStyles.verticalBar]}></View>
                <View style={[FlexStyles.flexDirectionrow]}>
                  <Image
                    source={require('../assets/images/homescreen/sendSplit.png')}
                    style={[CommonCardStyles.grpPeople]}
                  />
                  <Text>SEND SPLIT</Text>
                </View>
                <View style={[CommonCardStyles.verticalBar]}></View>

                <View style={[FlexStyles.flexDirectionrow]}>
                  <Image
                    source={require('../assets/images/homescreen/rupee.png')}
                    style={[CommonCardStyles.grpPeople]}
                  />
                  <Text>{item.totalCost}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      ))}
    </>
  );
};
// class CommonCard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       groupPeople: [
//         {id: 1, src: require('../assets/images/homescreen/male.png')},
//         {id: 2, src: require('../assets/images/homescreen/female.png')},
//       ],
//     };
//   }
//   render() {
//     return (
//       <View style={[CommonCardStyles.cardStyle]}>
//         <View>
//         <HalfCircle size={100} color="red" rotation={90} />
//         </View>
//         <View
//           style={[
//             FlexStyles.flexDirectioncolumn,
//             FlexStyles.dflex,
//             FlexStyles.alignItems,
//           ]}>
//           <View style={[FlexStyles.flexDirectionrow, FlexStyles.dflex]}>
//             <View style={[CommonCardStyles.cardBorderStyle]}></View>
//             <View style={[{padding: 7}]}>
//               <Image
//                 source={require('../assets/images/homescreen/roundtable.png')}
//                 style={[{width: 50, height: 50, resizeMode: 'center'}]}
//               />
//             </View>

//             <View style={[FlexStyles.flexDirectioncolumn]}>
//               <View style={[{width:width/2.09, backgroundColor:'red'}]}>
//                 <Text>Lonavla TrakkingTrakdf dsd sfsdf</Text>
//               </View>
//               <View
//                 style={[
//                   FlexStyles.flexDirectionrow,
//                   FlexStyles.flex1,
//                   FlexStyles.flexarround,
//                 ]}>
//                 <View style={[FlexStyles.dflex, FlexStyles.flexDirectionrow]}>
//                   <Image
//                     source={require('../assets/images/homescreen/userAvatar.png')}
//                     style={[{width: 20, height: 20, resizeMode: 'center'}]}
//                   />
//                   <Text>Mahesh Shendage</Text>
//                 </View>
//                 <View style={[FlexStyles.dflex, FlexStyles.flexDirectionrow]}>
//                   <Image
//                     source={require('../assets/images/homescreen/group.png')}
//                     style={[{width: 20, height: 20, resizeMode: 'center'}]}
//                   />
//                   <Text>5</Text>
//                 </View>
//               </View>
//             </View>
//             <Text>Sat 20-March</Text>
//           </View>
//           <View style={[{borderWidth: 1, width: width - 70}]}></View>
//           <View style={[FlexStyles.dflex, FlexStyles.flexDirectionrow]}>
//             <View style={[CommonCardStyles.cardBorderStyle]}></View>
//             <View
//               style={[
//                 FlexStyles.flexDirectionrow,
//                 FlexStyles.flexarround,
//                 FlexStyles.flex1,{width:width/3, backgroundColor:'red', padding:15}
//               ]}>
//               <View style={[FlexStyles.flexDirectionrow]}>
//                 {this.state.groupPeople.map((image, id) => (
//                   <Image
//                     source={image.src}
//                     key={id}
//                     style={[CommonCardStyles.grpPeople]}
//                   />
//                 ))}
//               </View>
//               <View style={[CommonCardStyles.verticalBar]}></View>
//               <View style={[FlexStyles.flexDirectionrow]}>
//                 <Image
//                   source={require('../assets/images/homescreen/sendSplit.png')}
//                   style={[CommonCardStyles.grpPeople]}
//                 />
//                 <Text>SEND SPLIT</Text>
//               </View>
//               <View style={[CommonCardStyles.verticalBar]}></View>

//               <View style={[FlexStyles.flexDirectionrow]}>
//                 <Image
//                   source={require('../assets/images/homescreen/rupee.png')}
//                   style={[CommonCardStyles.grpPeople]}
//                 />
//                 <Text>5000</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }
export default CommonCard;
