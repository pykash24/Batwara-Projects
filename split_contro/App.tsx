import { LogBox, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Rootnavigation from './src/navigation/Rootnavigation';
import { store } from './src/store/store'
import { Provider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, [])
  return (
    <Provider store={store}>
      <PaperProvider>
        <Rootnavigation />
      </PaperProvider>
    </Provider>

  )
}

export default App

const styles = StyleSheet.create({})