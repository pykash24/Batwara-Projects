import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { SendOTP } from '../../constants/labels/Profile/EditProfileLabels';
import FlexStyles from '../../assets/Styles/FlexStyles';
import down_arrow from '../../assets/images/commonImage/down-arrow.png'
import { useNavigation } from '@react-navigation/native';
import { TripsOptionData } from '../../data/expense/Expense';
import BottomSlider from '../bottomSheet/BottomSlider';

const Dropdown = ({ value = '',setValue=()=>{}, startIcon = null, textStyles = null,setshow=()=>{},show }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => setshow(!show)} activeOpacity={0.3} style={[FlexStyles.flexDirectionrow, FlexStyles.flexBetween, FlexStyles.alignItems, FlexStyles.flex1,styles.relative]}>
            <View style={[FlexStyles.flexDirectionrow, FlexStyles.alignItems, FlexStyles.flex1]}>
                {startIcon}
                <Text style={[textStyles]}>
                    {value}
                </Text>
            </View>
            <TouchableOpacity onPress={() => setshow(true)} activeOpacity={0.3}>
                <Image source={down_arrow} style={[styles.icon]} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    headingText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.black
    },
    subHeadingText: {
        fontWeight: 400,
        fontSize: 14,
        color: Colors.black
    },
    normalText: {
        fontSize: 12,
        color: Colors.black
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    relative:{
        position:'relative'
    }

})

export default Dropdown;