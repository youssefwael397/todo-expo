import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { selectTodos, toggleTodo } from '../redux/todoSlice.js';

const TodoList = () => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  return (
    <View>
      {todos.map((todo) => (
        <View key={todo.id}>
          <Text
            style={{
              textDecorationLine: todo.completed ? 'line-through' : 'none',
            }}
          >
            {todo.text}
          </Text>
          <Button
            title={todo.completed ? 'Undo' : 'Complete'}
            // onPress={() => dispatch(toggleTodo(todo.id))}
          />
        </View>
      ))}
    </View>
  );
};

export default TodoList;
