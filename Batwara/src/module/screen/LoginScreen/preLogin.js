import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Button} from 'react-native';

class Prelogin extends Component {
  constructor(props){
    super(props);
      this.state={}
    
  }
  render() {
    return (
      <View>
        <Text>prelogin screen</Text>
        <Button
          title="Go to Login"
          onPress={() => this.props.navigation.navigate('Login')}
          // onPress={() =>
          //   this.props.navigation.navigate('Details', { name: 'Custom Details header' })
          // }
        />
      </View>
    );
  }
}
export default Prelogin;
