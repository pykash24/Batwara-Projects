import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react';
import { Colors } from '../../constants/Colors'
import { Button } from 'react-native-paper'
import BottomSheet from './BottomSheet';

const OpenSheet = () => {
    const [show,setShow]=useState(true)
    return (
        <View style={styles.container}>
            {/* <Button icon="eye" mode="elevated" onPress={() => console.log('Pressed')}>
                Show bottom Sheet
            </Button> */}
            {show && <BottomSheet />}
            <StatusBar style="auto"/>
        </View>
    )
}

export default OpenSheet

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: Colors.white,
        // alignItems: 'center',
        // justifyContent: 'center'
    }
})