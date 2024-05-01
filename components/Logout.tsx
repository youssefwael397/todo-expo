import React from 'react';
import { View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { LogOut } from '../redux/authSlice';
import { AppDispatch } from '../redux/store';

const Logout = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(LogOut());
  };

  return (
    <View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Logout;
