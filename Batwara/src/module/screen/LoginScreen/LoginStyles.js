import { StyleSheet, Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");


const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
      },
      inner: {
        padding: 24,
        flex: 1,
        justifyContent: 'space-around',
      },
      header: {
        fontSize: 36,
        marginBottom: 48,
      },
      textInput: {
        height: 40,
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 36,
      },
      btnContainer: {
        backgroundColor: 'white',
        marginTop: 12,
      },
})

export default LoginStyles