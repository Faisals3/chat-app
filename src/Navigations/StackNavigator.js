import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationPage from '../pages/authenticationPage';
import TabNavigator from './TabNavigator';
import groupChat from '../pages/groupPage';
import newChatPage from '../pages/newChatPage';
import accountPage from '../pages/accountPage';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="Authentication Page"
        component={AuthenticationPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Group Page" component={groupChat} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
