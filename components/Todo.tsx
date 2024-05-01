import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { toggleTodoComplete } from '../redux/todoSlice';
import { Box, Text } from 'native-base';
import theme from '../utils/theme';

type TodoProps = {
  todo: ITodo;
};

const Todo = ({ todo }: TodoProps) => {
  const navigation = useNavigation();
  return (
    <Box bg="white" borderRadius="rounded2Xl" flex={1} my="2" mx="2">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        p="4"
      >
        <Pressable
          onPress={() => {
            toggleTodoComplete(todo.id);
          }}
          onLongPress={() => {
            navigation.navigate('EditTodo', { todo });
          }}
        >
          <Box
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
          >
            <FontAwesome
              name="square"
              size={24}
              color={
                todo.completed ? theme.colors.green500 : theme.colors.gray200
              }
            />
            <Text variant="textXl" ml="4">
              {todo.title}
            </Text>
          </Box>
        </Pressable>
      </Box>
    </Box>
  );
};

export default Todo;

const styles = StyleSheet.create({});
