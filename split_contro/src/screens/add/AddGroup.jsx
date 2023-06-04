
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
import default_group from '../../assets/images/splash2.png'
import tag from '../../assets/images/commonImage/tag.png'
import airplane from '../../assets/images/commonImage/airplane.png'
import down_arrow from '../../assets/images/commonImage/down-arrow.png'

import group_name from '../../assets/images/commonImage/group_name.png'
import splitEqual from '../../assets/images/commonImage/splitEqual.png'
import BottomSheet from '../../components/bottomSheet/BottomSheet';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/utils';
import ImagePicker from 'react-native-image-crop-picker';
import { formatDate } from '../../utils/Helper';
import { useDispatch, useSelector } from 'react-redux';
import { CreateGroup } from '../../store/thunks/ExpenseDetailthunk';
import FloatingTextInput from '../../components/textInput/FloatingTextInput';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Dropdown from '../../components/dropdown/Dropdown';
import BottomSlider from '../../components/bottomSheet/BottomSlider';
import { TripsOptionData } from '../../data/expense/Expense';

const AddScreen = () => {
    const expenseCTX = useSelector((state) => state.expense);
    const registerCTX = useSelector((state) => state.register);
    const [show, setshow] = useState(false)
    const [tripData, setTripData] = useState(TripsOptionData)

    const dispatch = useDispatch()
    const [showBottom, setShowBottom] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation();
    const [selectedTrip, setSelectedTrip] = useState("Select Group");
    const [img, setImg] = useState(null)
    const [date, setDate] = useState(formatDate(new Date()))

    const [data, setData] = useState({
        description: "Trip Type",
        group_name: "",
    })
    const handleGroupName = (text) => {
        console.log('teeeeee', text);
        setshow(false)
        setData({ ...data, group_name: text })
    }
    const handlechangeInput = (value) => {
        console.log('bbbbbb', value);
        setData({ ...data, description: value })
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
  
    const createGroup = () => {
        console.log('aaaaaaaa', registerCTX, data);
        setLoading(true)
        let user_id = registerCTX?.loginData?.user_id
        // let user_id="be31d44f-2c0b-40ae-b082-469868a19866"

        let payload = {
            "user_id": user_id,
            "group_name": data?.group_name,
            "group_description": data?.description
        };

        if (data?.group_name == "" || data?.description == "") {
            Toast.show({
                type: "error",
                text1: "error",
                text2: "Group name could not empty",
            });
            setLoading(false)
        }
        else if (user_id) {
            dispatch(CreateGroup(payload)).then((res) => {
                console.log('add group return', res);
                if (res?.meta?.arg?.user_id) {
                    Toast.show({
                        type: "success",
                        text1: "success",
                        text2: `${data?.group_name} group is created`,
                    });
                    setTimeout(() => {
                        // navigation.navigate('Main')
                    }, 1000);
                }
                else {
                    Toast.show({
                        type: "error",
                        text1: "error",
                        text2: `${data?.group_name} group is not creating try again`,
                    });
                }
            }).finally(() => {
                setLoading(false)
            })
        }
        else {
            Toast.show({
                type: "error",
                text1: "error",
                text2: "Something went wrong,Relogin and try please",
            });
            setLoading(false)
            setTimeout(() => {
                navigation.navigate('Login')
            }, 2000);
        }
    }
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
        console.log('mmmmmmmmmm', expenseCTX?.date);
        let selectedDate = expenseCTX?.date
        let updatedDate
        if (selectedDate != undefined) {
            try {                
                updatedDate = formatDate(new Date(selectedDate))
            } catch (error) {
                console.log('error dat', error);
            }
            setDate(updatedDate)
         }
    }, [expenseCTX]);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: Colors.bgColor,
               
            }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: Colors.commonAppBackground, height: WINDOW_HEIGHT , opacity:show? 0.4:1}}>
                <View style={styles.container}>
                    <View style={[styles.header, FlexStyles.flexDirectioncolumn]}>
                        <View style={[FlexStyles.flexDirectionrow, FlexStyles.alignItems, FlexStyles.flexBetween]}>
                            <TouchableOpacity style={[FlexStyles.flexDirectionrow, styles.gap15,]} onPress={() => navigation.goBack()}>
                                <FontAwesomIcon name="arrow-left" color={Colors.white} size={20} />
                                <TextFeild
                                    type={"heading"} color={Colors.white}
                                    value={"Create a group"} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => createGroup()} activeOpacity={0.2}>
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
                        <View style={styles.mainViewChild1}>
                            <TouchableOpacity style={[FlexStyles.justifyContainCenter, FlexStyles.alignItems]} onPress={() => handleClickImg()}>
                                {img ? <Image style={styles.camera} source={{ uri: `data:${img?.mime};base64,${img?.data}` }} />

                                    : <Image source={default_group} style={styles.camera} />}

                            </TouchableOpacity>
                        </View>
                        <View style={styles.mainViewChild2}>
                            <View style={[FlexStyles.flexDirectionrow, FlexStyles.alignItems]}>
                                <TouchableOpacity style={[FlexStyles.justifyContainCenter, FlexStyles.alignItems, styles.whiteCircle]}>
                                    <Image source={group_name} style={styles.icon} />
                                </TouchableOpacity>
                                <View style={[styles.TextInputContainer]}>
                                    <FloatingTextInput
                                        textStyles={{ backgroundColor: "transparent", color: Colors.gray, fontSize: 12 }}
                                        label={'Enter group name'}
                                        value={data?.group_name}
                                        onChangeText={text => handleGroupName(text)} />
                                </View>
                            </View>

                            <View style={[FlexStyles.flexDirectionrow, FlexStyles.alignItems]}>
                                <TouchableOpacity style={[FlexStyles.justifyContainCenter, FlexStyles.alignItems, styles.whiteCircle]}>
                                    <Image source={tag} style={styles.icon} />
                                </TouchableOpacity>
                                <View style={[styles.TextInputContainer]}>
                                    <Dropdown
                                        startIcon={<Image source={airplane} style={[styles.icon, { marginRight: 10 }]} />}
                                        textStyles={{ backgroundColor: "transparent", color: Colors.gray, fontSize: 12 }}
                                        show={show} setshow={setshow}
                                        value={data?.description}
                                        setValue={(value) => { console.log('aaaaa', value); }}
                                        // onChangeText={text => handlechangeInput(text)}
                                        />
                                </View>

                            </View>

                        </View>
                        {/* </View> */}
                    </KeyboardAvoidingView>

                    <View style={styles.footer}>
                        <View style={[FlexStyles.flexDirectioncolumn]}>
                            <TouchableOpacity style={[FlexStyles.justifyContainCenter, FlexStyles.alignItems]} onPress={() => navigation.navigate('Contacts')}>
                                <Image source={group} style={styles.footerIcon} />
                            </TouchableOpacity>
                            <TextFeild
                                color={Colors.white}
                                value={'Add Group Members'} />
                        </View>
                        <View tyle={[FlexStyles.flexDirectioncolumn,]}>
                            <TouchableOpacity style={[FlexStyles.justifyContainCenter, FlexStyles.alignItems]} onPress={() => navigation.navigate('Schedule')}>
                                <Image source={calendar} style={styles.footerIcon} />
                            </TouchableOpacity>
                            <TextFeild
                                color={Colors.white}
                                value={date ? date : "Select Date"} />
                        </View>
                    </View>
                </View >
            </ScrollView>
            {show &&
                <BottomSlider
                    data={tripData}
                    value={data.description}
                    setData={setData} onSelect={(data) => { handlechangeInput(data) }}
                    optionIcon={<Image source={airplane} style={[styles.icon]} />}
                    onClose={() => setshow(false)} />
            }
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
        // backgroundColor:'rgba(0, 0, 0, 0.05)'
    },

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
        height: '60%',
        width: WINDOW_WIDTH * 0.9,
        position: 'absolute',
        top: '11%',
        left: 17,
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
        width: 60,
        height: 60,
        marginTop: 15,
        resizeMode:'contain'
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
    icon: {
        width: 20,
        height: 20,
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
        paddingHorizontal: 10
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