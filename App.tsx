import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { View, StyleSheet } from 'react-native'; // Import StyleSheet and View from react-native
import TodoList from './components/TodoList.js';
// import TodoInput from './components/TodoInput';

export default function App() {
  return (
    <Provider store={store}>
      <View>
        <TodoList />
        {/* <TodoInput /> */}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
