import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import Todos from '../components/Todos';
import { getTodosByUserId } from '../redux/todoSlice';
import AddTodo from '../components/AddTodo';
import TodoApp from '../components/TodoApp';
import { Icon, IconButton } from 'native-base';
import { colors } from '../utils/theme/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CreateTodo from '../components/CreateTodo';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
 
  useEffect(() => {
    dispatch(getTodosByUserId());
  }, []);

  return (
    <View style={styles.container}>
      <TodoApp />
      <CreateTodo/>      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  
});

export default Home;
