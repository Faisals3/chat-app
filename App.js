import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import * as Application from 'expo-application';
import Firebase from './src/components/firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import accountPage from './src/components/accountPage';
import Chats from './src/components/Chats';
import store from './src/components/redux/store';
import { Provider as ReduxProvider } from 'react-redux';

export default function App() {
  const Tab = createBottomTabNavigator();

  function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Account Page" component={accountPage} />
        <Tab.Screen name="Chats" component={Chats} />
      </Tab.Navigator>
    );
  }

  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {},

  input: {
    margin: 12,
  },
});
