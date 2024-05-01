import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Home = () => {
  const navigation = useNavigation();
  const { loggedIn } = useSelector((state: RootState) => state.auth);
//   console.log(loggedIn);
  return (
    <View>
      <Text>Home</Text>
      <Text>loggedIn: {loggedIn}</Text>
      <Pressable onPress={() => navigation.navigate('CreateTodo')}>
        <Text>Navigate to Create todo</Text>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
