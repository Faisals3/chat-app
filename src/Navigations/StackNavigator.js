import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationPage from '../pages/authenticationPage';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Authentication Page"
        component={AuthenticationPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Account Page" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
