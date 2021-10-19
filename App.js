import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { store, persistor } from './src/redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import MyStack from './src/Navigations/StackNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator, View } from 'react-native';

const LoadingMarkup = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
    }}
  >
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<LoadingMarkup />} persistor={persistor}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </PersistGate>
    </ReduxProvider>
  );
}
