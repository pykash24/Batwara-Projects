import { FlatList, Image, KeyboardAvoidingView, PermissionsAndroid, ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import TextFeild from '../../components/TextFeild'
import { Colors } from '../../constants/Colors'
import FontAwesomIcon from 'react-native-vector-icons/FontAwesome5';
import checked from '../../assets/images/commonImage/checkedCircle.png'
import calendar from '../../assets/images/commonImage/calendar.png'
import group from '../../assets/images/commonImage/group-m.png'
import { useNavigation } from '@react-navigation/native';
import FlexStyles from '../../assets/Styles/FlexStyles';
import camera from '../../assets/images/commonImage/camera-sm.png'
import amount from '../../assets/images/commonImage/amount.png'
import addUser from '../../assets/images/commonImage/addUser.png'

import bill from '../../assets/images/commonImage/bill.png'
import splitEqual from '../../assets/images/commonImage/splitEqual.png'
import BottomSheet from '../../components/bottomSheet/BottomSheet';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/utils';
import { Friends } from '../../data/friends/Friends';
import woman from '../../assets/images/commonImage/woman.png'
import men from '../../assets/images/commonImage/men.png'
import ImagePicker from 'react-native-image-crop-picker';
import { formatDate } from '../../utils/Helper';
import { useDispatch, useSelector } from 'react-redux';
import { AddExpense } from '../../store/thunks/ExpenseDetailthunk';
import FloatingTextInput from '../../components/textInput/FloatingTextInput';
import CommonStyles from '../../assets/Styles/CommonStyles';

const AddScreen = () => {
  const expenseCTX = useSelector((state) => state.expense);
  const dispatch = useDispatch()
  const [showBottom, setShowBottom] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation();
  const [selectedTrip, setSelectedTrip] = useState("Select Group");
  const [img, setImg] = useState(null)
  const [date, setDate] = useState(formatDate(new Date()))

  const [data, setData] = useState({
    description: "",
    amount: null,
    type: ""
  })
  const handlechangeInput = (name, value) => {
    console.log('hhhh', name, value);
    setData((prevState) => {
      let returnVal = {
        ...prevState,
        [name]: value,
      };
      return returnVal;
    });
  }
  const [uri, setUri] = useState(null);
  const pickPicture = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('urlll', image.path);
      setUri(image.path);
      // props.onChange?.(image);
    });
  };
  const onCloseBottom = () => {
    console.log('clicked');
    setShowBottom(false)
  }
  const onClickAdd = (navigation, id) => {
    console.log('iddd2', id)

    if (id == 0) {
      navigation.navigate('Contacts')
      // navigation.navigate("addFriend")
    }

  }
  const ItemFD = ({ name, gender, id }) => (
    console.log('iddd', id),
    <TouchableOpacity style={{ padding: 2 }}
      onPress={() => onClickAdd(navigation, id)}
    >
      <View style={[FlexStyles.flexDirectioncolumn, FlexStyles.alignItems, FlexStyles.justifyContainCenter]}>
        <View style={[styles.imgView]}>
          <Image source={id == 0 ? addUser : gender == "F" ? woman : men} style={styles.image} />
        </View>
        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.imgText}>{name}</Text>
      </View>
    </TouchableOpacity>

  );
  const handleClickImg = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      setImg(img)
      console.log('imageyyyyy', image);
      url = `data:${image?.mime};base64,${image?.data}`
      console.log('bbbb', `data:${image?.mime};base64,${image?.data}`);

    }).catch((error) => {
      console.log('error', error);
    })
  }
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'BATWARA App Camera Permission',
          message:
            'BATWARA App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };


  useEffect(() => {
    requestCameraPermission()
  }, []);
  useEffect(() => {
    console.log('mmmmmmmmmm', expenseCTX?.date?.date);
    let selectedDate = expenseCTX?.date?.date
    if (selectedDate) {
      let updatedDate = formatDate(new Date(selectedDate))

      setDate(updatedDate)
    }
  }, [expenseCTX]);
  console.log('jj000j', data);
  const createexpense = () => {
    setLoading(true)
    let payload = {
      description: data?.description,
      group_id: "301a7607-d32f-4aa7-ae01-e9c14604c96e",
      paid_by: "34234d6d-0824-4025-b93c-7d75f6f28249",
      amount: data?.amount,
      user_ids: [
        {
          "user_id": "34234d6d-0824-4025-b93c-7d75f6f28249"
        },
        {
          "user_id": "ad13e705-6a34-4b72-bdff-7a476679842e"
        }
      ]
    };
    dispatch(AddExpense(payload)).then((res) => {
      console.log('add expense return', res);
    }).finally(() => {
      setLoading(false)
    })
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.bgColor,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: Colors.commonAppBackground, height: WINDOW_HEIGHT }}>
        <View style={styles.container}>
          <View style={[styles.header, FlexStyles.flexDirectioncolumn]}>
            <View style={[FlexStyles.flexDirectionrow, FlexStyles.alignItems, FlexStyles.flexBetween]}>
              <TouchableOpacity style={[FlexStyles.flexDirectionrow, styles.gap15,]} onPress={() => navigation.goBack()}>
                <FontAwesomIcon name="arrow-left" color={Colors.white} size={20} />
                <TextFeild
                  type={"heading"} color={Colors.white}
                  value={"Add Expense"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => createexpense()} >
                {loading ?
                  <ActivityIndicator size="small" color="#ffff" animating={loading} /> :
                  <Image source={checked} style={styles.checked} />
                }
              </TouchableOpacity>
            </View>

          </View>

          <KeyboardAvoidingView style={[styles.mainView, FlexStyles.flexDirectioncolumn]}>
            <View style={[styles.round1]}>
              <View style={[styles.whiteRound]} />
            </View>
            <View style={[styles.round2]}>
              <View style={[styles.whiteRound]} />
            </View>
            <View style={[styles.round3]}>
              <View style={[styles.whiteRound]} />
            </View>
            <View style={[styles.round4]}>
              <View style={[styles.whiteRound]} />
            </View>
            <View style={[styles.plusView]}>
              <View style={[FlexStyles.justifyContainstart]}>
                <ScrollView style={{ marginRight: 40 }}>
                  <FlatList
                    data={Friends}
                    horizontal={true}
                    style={{ width: '100%' }}
                    renderItem={({ item }) => <ItemFD id={item.id} name={item.name} gender={item.gender} />}
                    keyExtractor={item => item.id}
                  />
                </ScrollView>
              </View>
            </View>

            <View style={styles.mainViewChild1}>
              <TouchableOpacity style={[FlexStyles.justifyContainCenter, FlexStyles.alignItems]} onPress={() => handleClickImg()}>
                {img ? <Image style={styles.camera} source={{ uri: `data:${img?.mime};base64,${img?.data}` }} />

                  : <Image source={camera} style={styles.camera} />}

              </TouchableOpacity>
              {/* <TouchableOpacity style={[FlexStyles.justifyContainCenter, FlexStyles.alignItems]} onPress={pickPicture}>
                <Image
                  style={styles.avatar}
                  source={uri ? { uri } : ''}
                />
              </TouchableOpacity> */}
            </View>
            <View style={styles.mainViewChild2}>
              <View style={[FlexStyles.flexDirectionrow, FlexStyles.alignItems, styles.gap10]}>
                <TouchableOpacity style={[FlexStyles.justifyContainCenter, FlexStyles.alignItems, styles.whiteCircle]}>
                  <Image source={bill} style={styles.footerIcon} />
                </TouchableOpacity>
                <View style={[styles.TextInputContainer]}>
                  <FloatingTextInput
                    textStyles={{ backgroundColor: "transparent", color: Colors.gray, fontSize: 12 }}
                    label={'Enter bill or item name'}
                    value={data?.description}
                    onChangeText={text => handlechangeInput('description', text)} />
                </View>
              </View>
              <View style={[FlexStyles.flexDirectionrow, FlexStyles.alignItems, styles.gap10]}>
                <TouchableOpacity style={[FlexStyles.justifyContainCenter, FlexStyles.alignItems, styles.whiteCircle]}>
                  <Image source={amount} style={styles.footerIcon} />
                </TouchableOpacity>
                {/* <View style={[styles.searchOuterView, styles.pl10]}>
                  <TextInput placeholder='0.00' placeholderTextColor={Colors.darkGrey}
                    style={[styles.searchInput, styles.width100]}
                    keyboardType={'numeric'}
                    value={data?.amount}
                    onChangeText={text => handlechangeInput('amount', text)} />
                </View> */}
                <View style={[styles.TextInputContainer]}>
                  <FloatingTextInput
                    textStyles={{ backgroundColor: "transparent", color: Colors.gray, fontSize: 12 }}
                    label={'Enter Amount'}
                    value={data?.amount}
                    onChangeText={text => handlechangeInput('amount', text)} />
                </View>
              </View>

              <View style={[FlexStyles.flexDirectionrow, FlexStyles.alignItems, styles.gap10]}>
                <TouchableOpacity style={[FlexStyles.justifyContainCenter, FlexStyles.alignItems, styles.whiteCircle]}>
                  <Image source={splitEqual} style={styles.footerIcon} />
                </TouchableOpacity>
                <View style={[styles.TextInputContainer]}>
                  <TextInput placeholder='Split by equality' placeholderTextColor={Colors.darkGrey}
                    style={[styles.searchInput, styles.width100]} />
                </View>
                {/* <View style={[styles.searchOuterView, styles.pl10]}>
                  <TextInput placeholder='Split by equality' placeholderTextColor={Colors.darkGrey}
                    style={[styles.searchInput, styles.width100]} />
                </View> */}
              </View>

            </View>
            {/* </View> */}
          </KeyboardAvoidingView>

          <View style={styles.footer}>
            <View style={[FlexStyles.flexDirectioncolumn]}>
              <TouchableOpacity style={[FlexStyles.justifyContainCenter, FlexStyles.alignItems]} onPress={() => setShowBottom(!showBottom)}>
                <Image source={group} style={styles.footerIcon} />
              </TouchableOpacity>
              <TextFeild
                color={Colors.white}
                value={selectedTrip} />
            </View>
            <View tyle={[FlexStyles.flexDirectioncolumn,]}>
              <TouchableOpacity style={[FlexStyles.justifyContainCenter, FlexStyles.alignItems]} onPress={() => navigation.navigate('Schedule')}>
                <Image source={calendar} style={styles.footerIcon} />
              </TouchableOpacity>
              <TextFeild
                color={Colors.white}
                value={date} />
            </View>
          </View>
          {showBottom &&
            <BottomSheet setSelectedTrip={setSelectedTrip} onClose={() => onCloseBottom()} />
          }
        </View >
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddScreen

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    color: 'black',
    height: WINDOW_HEIGHT,
    position: "relative",
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  // TextInputContainer: {
  //   height: 45,
  //   borderRadius: 10,
  //   marginLeft: 10,
  //   marginRight: 10,
  //   borderWidth: 1.2,
  //   borderColor: Colors.white,
  //   paddingHorizontal: 10,
  //   width:"70%"
  // },
  TextInputContainer: {
    height: 45,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 2,
    borderColor: Colors.commonAppBackground,
    paddingHorizontal: 10,
    width: "75%"
  },
  header: {
    padding: 15,
    paddingVertical: 20,
    backgroundColor: Colors.primary,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20
  },
  footer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WINDOW_WIDTH
  },
  mainView: {
    backgroundColor: Colors.white,
    // height: '70%',
    height: '100%',
    flex: 1,
    margin: 15,
    position: 'relative',
    alignItems: 'center'
  },
  mainViewChild1: {
    marginTop: '10%',
    width: 90,
    height: 90,
    backgroundColor: Colors.commonAppBackground,
    borderRadius: 100
  },
  mainViewChild2: {
    marginTop: '20%',
    gap: 12,
    paddingLeft: 10
  },
  whiteCircle: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: Colors.commonAppBackground,
    justifyContent: 'center',
    alignItems: 'center'
  },
  camera: {
    width: 50,
    height: 50,
    marginTop: 15
  },
  circle: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  checked: {
    width: 25,
    height: 25
  },
  gap15: {
    gap: 15
  },
  width100: {
    width: '75%'
  },
  searchOuterView: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 40,
    alignItems: 'center',
  },
  pl20: {
    paddingLeft: 20
  },
  pl10: {
    paddingLeft: 10
  },
  mt20: {
    marginTop: 20
  },
  plusView: {
    position: 'absolute',
    bottom: 20,
    left: 20
  },
  searchInput: {
    fontSize: 12,
    color: Colors.black,
    // paddingHorizontal: 10
  },
  whiteRound: {
    width: 50,
    height: 50,
    borderRadius: 100,
    zIndex: -90,
    backgroundColor: Colors.commonAppBackground,
  },
  round1: {
    position: 'absolute',
    top: '15%',
    left: -20

  },
  round2: {
    position: 'absolute',
    top: '15%',
    right: -20
  },
  round3: {
    position: 'absolute',
    bottom: '15%',
    left: -20
  },
  round4: {
    position: 'absolute',
    bottom: '15%',
    right: -20

  },
  imgText: {
    fontSize: 12,
    color: Colors.dark,
    width: WINDOW_WIDTH * 0.18,
    marginTop: 5
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  imgView: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary
  },

})