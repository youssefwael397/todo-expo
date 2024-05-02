import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import Todos from '../components/Todos';
import { getTodosByUserId } from '../redux/todoSlice';
import AddTodo from '../components/AddTodo';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTodosByUserId());
  }, []);

  return (
    <View style={styles.container}>
      <Todos />
      <AddTodo />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default Home;
