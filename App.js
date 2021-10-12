import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import * as Application from 'expo-application';
import Firebase from './src/components/firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import accountPage from './src/pages/accountPage';
import Chats from './src/pages/Chats';
import store from './src/redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import TabNavigator from './src/Navigations/TabNavigator';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </ReduxProvider>
  );
}
