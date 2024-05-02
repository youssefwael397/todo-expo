import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import Home from '../screens/Home';
import CreateTodo from '../screens/CreateTodo';
import EditTodo from '../screens/EditTodo';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import LoginScreen from '../screens/Login';
import Register from '../screens/Register';
import { LogOut } from '../redux/authSlice';
import { StyleSheet, Text } from 'react-native';
import { IconButton } from 'react-native-paper';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const { loggedIn, me } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const handleLogout = () => {
    dispatch(LogOut());
    navigation.navigate('Login');
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center', // This centers the title for all screens
      }}
    >
      {loggedIn == true ? (
        <>
          <Stack.Screen
            name="Todos"
            component={Home}
            options={{
              headerRight: () => (
                // Add the logout icon button to all screens by default
                <IconButton
                  icon="logout"
                  onPress={handleLogout}
                  iconColor={'#f00'}
                />
              ),
            }}
          />
          <Stack.Screen name="CreateTodo" component={CreateTodo} />
          <Stack.Screen name="EditTodo" component={EditTodo} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
  logoutButton: {
    margin: 20,
    color: 'blue',
    textAlign: 'center',
  },
});