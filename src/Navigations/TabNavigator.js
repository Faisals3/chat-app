import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import accountPage from '../pages/accountPage';
import Chats from '../pages/Chats';
import React from 'react';

export default function myTabsNav() {
  const Tab = createBottomTabNavigator();

  function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Account Page" component={accountPage} />
        <Tab.Screen name="Chats" component={Chats} />
      </Tab.Navigator>
    );
  }

  return <MyTabs />;
}
