import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Box, FlatList } from 'native-base';
import Todo from './Todo';

const Todos = () => {
  // Retrieve todos and loading state from Redux store
  const { todos, loading } = useSelector((state: RootState) => state.todos) as {
    todos: ITodo[];
    loading: boolean;
  };

  return (
    <Box flex={1}>
      <FlatList
        data={todos}
        renderItem={({ item }) => <Todo todo={item} />}
        keyExtractor={(item: ITodo) => item.id.toString()}
      />
    </Box>
  );
};

export default Todos;
