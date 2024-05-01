import todo from '../components/Todo'; 
import useGlobalStore, { AppDispatch, RootState } from '../redux/store';
import { Box, Text } from '../utils/theme';
import { Picker } from '@react-native-picker/picker';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { nanoid } from 'nanoid/non-secure';
import React, { useState } from 'react';
import { Pressable, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoById } from '../redux/todoSlice';
import { RootStackParamList } from '../navigation/types';

type EditTodoRoute = RouteProp<RootStackParamList, 'EditTodo'>;

const EditTodo = () => {
   const navigation = useNavigation();
   const { todos } = useSelector((state: RootState) => state.todos);
   const { params } = useRoute<EditTodoRoute>();
   const [newTodo, setNewTodo] = useState<ITodo>(
     params?.todo || { id: 0, userId: 0, completed: false, title: '' }
   );
   const dispatch = useDispatch<AppDispatch>();

  const handleUpdateTodo = () => {
    // dispatch(edit());
    navigation.navigate('Home');
  };

  const handleDeleteTask = () => {
    dispatch(deleteTodoById(newTodo.id));

    navigation.navigate('Home');
  };

  return (
    <Box flex={1} bg="gray100" p="4" pb="10">
      <Box
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          width={'100%'}
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            width={'100%'}
            bg="white"
            borderRadius="roundedXl"
            alignItems="center"
            justifyContent="center"
            p="4"
          >
            <TextInput
              style={{
                fontSize: 20,
                width: '100%',
              }}
              placeholder="Create new task"
              value={newTodo.title}
              onChangeText={(text) => {
                setNewTodo((prev) => {
                  return {
                    ...prev,
                    title: text,
                  };
                });
              }}
            />
          </Box>
          <Box height={20} />
        </Box>
        <Box
          mx="4"
          bg="red500"
          width={'100%'}
          borderRadius="roundedXl"
          p="4"
          alignItems="center"
          style={{
            marginTop: '60%',
          }}
        >
          <Pressable onPress={handleDeleteTask}>
            <Text variant="textXl" color="blu200">
              Delete
            </Text>
          </Pressable>
        </Box>
        <Box
          mx="4"
          bg="blu500"
          width={'100%'}
          borderRadius="roundedXl"
          p="4"
          alignItems="center"
          style={{
            marginTop: 20,
          }}
        >
          <Pressable onPress={handleUpdateTodo}>
            <Text variant="textXl" color="blu200">
              Edit
            </Text>
          </Pressable>
        </Box>
      </Box>
    </Box>
  );
};

export default EditTodo;
