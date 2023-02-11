import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Button} from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Button
          title="Go to Landing"
          onPress={() => this.props.navigation.navigate('LandingStackNavigator')}
          // onPress={() =>
          //   this.props.navigation.navigate('Details', { name: 'Custom Details header' })
          // }
        />
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
          // onPress={() =>
          //   this.props.navigation.navigate('Details', { name: 'Custom Details header' })
          // }
        />
        <Button
          title="Push Details screen into the stack"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button
          title="Go back from Details"
          onPress={() => this.props.navigation.goBack()}
        />
        <Button
          title="Go back to first screen in stack"
          onPress={() => this.props.navigation.popToTop()}
        />

        <Button
          title="Go to Details and pass details"
          onPress={() =>
            this.props.navigation.navigate('Try', {
              names: 'Batwara app created at 302',
              otherParam: 'anything you want here',
            })
          }
        />
      </View>
    );
  }
}

export default Login;
