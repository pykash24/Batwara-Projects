import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Button} from 'react-native';

class Try extends Component {
    constructor(props){
        super(props);
        this.state={}
    }
  render() {
    return (
      <View>
        <Text>Note1: 
            {JSON.stringify(this.props.route.params.names)}
            </Text>
            <Text>Note2: 
            {JSON.stringify(this.props.route.params.otherParam)}
            </Text>
      </View>
    );
  }
}
export default Try;
