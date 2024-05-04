import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { createNewTodo } from '../redux/todoSlice';

const AddTodo = () => {
  const [todoText, setTodoText] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.todos.error);

  const handleAddTodo = () => {
    dispatch(createNewTodo(todoText));
    setTodoText('');
  };

  return (
    <>
      {error && <Text style={styles.error}>{error.message}</Text>}
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Add Todo"
          value={todoText}
          onChangeText={setTodoText}
        />
        <Button title="Add" onPress={handleAddTodo} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#fff', // Optional: Add background color
    borderTopWidth: 1,
    borderTopColor: '#ccc', // Optional: Add border color
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Optional: Add border color
    padding: 5
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

export default AddTodo;
