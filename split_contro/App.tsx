import { LogBox, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Rootnavigation from './src/navigation/Rootnavigation';

const App = () => {
  useEffect(()=>{
    LogBox.ignoreAllLogs();
  },[])
  return (
    <Rootnavigation/>
  )
}

export default App

const styles = StyleSheet.create({})