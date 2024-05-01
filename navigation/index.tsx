import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import Home from '../screens/Home';
import CreateTodo from '../screens/CreateTodo';
import EditTodo from '../screens/EditTodo';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import LoginScreen from '../screens/Login';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const { loggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <Stack.Navigator>
      {loggedIn == true ? (
        <>
          <Stack.Screen name="Home" component={Home} />
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
