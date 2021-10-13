import accountPage from '../pages/accountPage';
import Chats from '../pages/chatPage';
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function myTabsNav() {
  const Tab = createMaterialBottomTabNavigator();

  function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Account Page"
        activeColor="#e91e63"
        barStyle={{ backgroundColor: 'white' }}
      >
        <Tab.Screen
          name="Account Page"
          component={accountPage}
          options={{
            tabBarLabel: 'Account Page',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Chats"
          component={Chats}
          options={{
            tabBarLabel: 'Chats',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="chat" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return <MyTabs />;
}
