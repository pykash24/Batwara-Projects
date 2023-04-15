import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native'

import Animated, {
    withSpring,
    useAnimatedStyle,
    useSharedValue,
  } from 'react-native-reanimated';
  
  function EditProfile() {
    const offset = useSharedValue(0);
  
    const defaultSpringStyles = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: withSpring(offset.value * 255) }],
      };
    });
  
    const customSpringStyles = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: withSpring(offset.value * 255, {
              damping: 20,
              stiffness: 90,
            }),
          },
        ],
      };
    });
  
    return (
      <>
        <Animated.View style={[styles.box, defaultSpringStyles]} />
        <Animated.View style={[styles.box, customSpringStyles]} />
        <Button style={[styles.box]}  onPress={() => (offset.value = Math.random())} title="Move" />
      </>
    );
  }
  export default EditProfile
  
const styles = StyleSheet.create({
    box: {
      width:200,
      height:89,
      background: 'black',
    }
})  