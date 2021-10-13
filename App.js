import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
