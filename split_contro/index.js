/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, Text, TextInput} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1; // the maximum amount the font size will scale.
TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.maxFontSizeMultiplier = 1; // the maximum amount the font size will scale.

AppRegistry.registerComponent(appName, () => App);
