import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Switch, DataTable, IconButton } from 'react-native-paper';
import { deleteTodoById, toggleTodoComplete } from '../redux/todoSlice';
import { useNavigation } from '@react-navigation/native';

const Todos = () => {
  const { todos, loading } = useSelector((state: RootState) => state.todos) as {
    todos: ITodo[];
    loading: boolean;
  };

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const onToggleSwitch = async (todoId: number) => {
    await dispatch(toggleTodoComplete(todoId));
  };

  const handleEdit = (todo: ITodo) => {
    navigation.navigate('EditTodo', { todo });
  };

  const handleDelete = async (todoId: number) => {
    await dispatch(deleteTodoById(todoId));
  };

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Completed</DataTable.Title>
          <DataTable.Title>Title</DataTable.Title>
          <DataTable.Title style={{ width: 120 }}>Actions</DataTable.Title>
        </DataTable.Header>

        {todos.map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>
              <Switch
                value={item.completed}
                onValueChange={() => onToggleSwitch(item.id)}
              />
            </DataTable.Cell>
            <DataTable.Cell>{item.title}</DataTable.Cell>
            <DataTable.Cell>
              <IconButton
                icon="circle-edit-outline"
                iconColor={'#00f'}
                size={20}
                onPress={() => handleEdit(item)}
                style={styles.action}
              />
              <IconButton
                icon="delete"
                iconColor={'#f00'}
                size={20}
                onPress={() => handleDelete(item.id)}
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      {loading && <Text>Loading...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  action: {
    marginHorizontal: 5,
    color: 'blue',
  },
  delete: {
    color: 'red',
  },
});

export default Todos;
