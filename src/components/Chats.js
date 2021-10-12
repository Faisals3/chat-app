import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput, List } from 'react-native-paper';
import * as Application from 'expo-application';
import Firebase, { dbRoot } from './firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

export default function Chats() {
  const currentUser = useSelector((state) => state.user);

  const addMessage = () => {
    var massegeRan = Math.random().toString();
    dbRoot
      .collection('group_chats')
      .doc('001')
      .collection('messages')
      .doc(massegeRan)
      .set({ massege: massegeRan, sender: currentUser.uid })
      .then(() => {
        console.log('message sent succesfuly');
      })
      .catch(() => {
        console.log('sent message failed');
      });
  };

  return (
    <View>
      <List.Item
        title="Group 1"
        description="ID : 001"
        left={(props) => <List.Icon {...props} icon="chat" />}
      />
      <List.Item
        title="Group 2"
        description="Id : 002"
        left={(props) => <List.Icon {...props} icon="chat" />}
      />
      <List.Item
        title="Group 3"
        description="Id : 003"
        left={(props) => <List.Icon {...props} icon="chat" />}
      />
      <List.Item
        title="Group 4"
        description="Id : 003"
        left={(props) => <List.Icon {...props} icon="chat" />}
      />
      <Button mode="contained" onPress={addMessage}>
        Test send message
      </Button>
    </View>
  );
}
