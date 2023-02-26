import React, {Component} from 'react';
import {
  View,
  TextInput,
  Animated,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import FlexStyles from '../../assets/Styles/FlexStyles';
class CommonTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      animatedIsFocused: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this._animatedIsFocused = Animated.timing(this.state.animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      duration: 100,
      useNativeDriver: false,
    });
    this._animatedIsFocused.start();
  }

  componentDidUpdate() {
    this._animatedIsFocused = Animated.timing(this.state.animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      duration: 100,
      useNativeDriver: false,
    });
    this._animatedIsFocused.start();
  }

  handleFocus = () => {
    this.setState({isFocused: true});
  };

  handleBlur = () => {
    this.setState({isFocused: false});
  };

  render() {
    const {animatedIsFocused, isFocused} = this.state;
    const {
      placeholder,
      value,
      maxLength,
      keyboardType,
      onChangeText,
      secureTextEntry,
      rightButtonLabel,
      rightButtonView,
      onPress
    } = this.props;
    const labelStyle = {
      position: 'absolute',
      padding: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [10, 0],
      }),
      left: 0,
      top: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -20],
      }),
      fontSize: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      color: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', '#000'],
      }),
    };

    return (
      <View
        style={[
          {marginTop: 20, marginLeft: 10, marginRight: 10, marginBottom: 10},
        ]}>
        <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
        <TextInput
          style={{
            height: 50,
            fontSize: 20,
            color: '#000',
            borderWidth: 0.4,
            borderRadius: 10,
            padding: 10,
          }}
          value={value}
          onChangeText={onChangeText}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          keyboardType={keyboardType}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
        />
        {rightButtonView && (
          <View style={[CommonTextStyles.buttomContainer]}>
            <TouchableOpacity
              style={[
                CommonTextStyles.button,
                FlexStyles.dflex,
                FlexStyles.flexDirectionrow,
                FlexStyles.alignItems,
              ]}
              onPress={onPress}
              >
              <Text style={[CommonTextStyles.text, FlexStyles.alignItems]}>
                {rightButtonLabel}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
const CommonTextStyles = StyleSheet.create({
  button: {
    backgroundColor: '#F17120',
    position: 'absolute',
    top: 0,
    bottom: 0,
    margin: 10,
    borderRadius: 5,
    // marginVertical: 'auto',
  },
  text: {
    color: '#ffff',
    padding: 5,
  },
  buttomContainer: {
    position: 'absolute',
    right: 100,
    top: 0,
    bottom: 0,
    // marginVertical: 'auto',
  },
  buttonOuterContainer: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default CommonTextInput;

// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Button,
//   KeyboardAvoidingView,
//   StyleSheet,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
//   SafeAreaView,
//   Animated,
// } from 'react-native';
// import FlexStyles from '../../assets/Styles/FlexStyles';
// class CommonTextInput extends Component {
//   constructor(props) {
//     super(props);
//     this.state={}
//   }

//   render() {
// const {
//   placeholder,
//   value,
//   maxLength,
//   keyboardType,
//   onChangeText,
//   secureTextEntry,
// } = this.props;
//     return (
//       <View
//         style={[
//           FlexStyles.dflex,
//           FlexStyles.flexDirectioncolumn,
//           CommonTextStyles.combineTextInput,
//         ]}>
//           <Text
//           style={[CommonTextStyles.placeholderText]}
//           >{placeholder}</Text>
//         <TextInput
//           placeholder={placeholder}
//           style={[CommonTextStyles.textInput]}
//           onChangeText={onChangeText}
//           keyboardType={keyboardType}
//           value={value}
//           maxLength={maxLength}
//           secureTextEntry={secureTextEntry}
//         />
//       </View>
//     );
//   }
// }

// const CommonTextStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   textInput: {
//     borderColor: '#000000',
//     borderRadius: 5,
//     borderWidth: 0.3,
//   },
//   combineTextInput: {
//     margin: 10,
//   },
//   placeholderText: {
//     padding: 15,
//   },
// });

// export default CommonTextInput;
