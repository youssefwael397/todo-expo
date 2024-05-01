import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navigation from './navigation';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}
