import { AppDispatch } from '../redux/store';
import { Box } from '../utils/theme';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { IconButton, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import { deleteTodoById, updateTodo } from '../redux/todoSlice';
import { RootStackParamList } from '../navigation/types';

type EditTodoRoute = RouteProp<RootStackParamList, 'EditTodo'>;

const EditTodo = () => {
  const navigation = useNavigation();
  const { params } = useRoute<EditTodoRoute>();
  const [newTodo, setNewTodo] = useState<ITodo>(
    params?.todo || { id: 0, userId: 0, completed: false, title: '' }
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateTodo = () => {
    dispatch(updateTodo(newTodo));
    navigation.navigate('Todos');
  };

  const handleDeleteTask = () => {
    dispatch(deleteTodoById(newTodo.id));
    navigation.navigate('Todos');
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Box width="80%">
        <TextInput
          style={{ fontSize: 20 }}
          placeholder="Edit Task"
          value={newTodo.title}
          onChangeText={(text) =>
            setNewTodo((prev) => ({ ...prev, title: text }))
          }
        />
      </Box>
      <Box
        width="40%"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          rowGap: 10,
          margin: 10,
        }}
      >
        <IconButton
          icon="delete"
          iconColor={'#f00'}
          size={20}
          onPress={handleDeleteTask}
        />
        <IconButton
          icon="circle-edit-outline"
          iconColor={'#00f'}
          size={20}
          onPress={handleUpdateTodo}
        />
      </Box>
      {/* <Box marginTop={"2"} width="80%">
      </Box> */}
    </Box>
  );
};

export default EditTodo;
