import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import Home from '../screens/Home';
import EditTodo from '../screens/EditTodo';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import LoginScreen from '../screens/Login';
import Register from '../screens/Register';
import { LogOut } from '../redux/authSlice';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import { colors } from '../utils/theme/colors';

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
        headerTitleAlign: 'center', // This centers the title for all screen
      }}
    >
      {loggedIn == true ? (
        <>
          <Stack.Screen
            name="Todos"
            component={Home}
            options={{
              headerTitle: `Welcome back, ${me.username}`,
              headerRight: () => (
                // Add the logout icon button to all screens by default
                <IconButton
                  icon="logout"
                  onPress={handleLogout}
                  iconColor={colors.red500}
                />
              ),
            }}
          />
          <Stack.Screen name="EditTodo" component={EditTodo} />
        </>
      ) : (
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
                  iconColor={colors.red500}
                />
              ),
            }}
          />
          <Stack.Screen name="EditTodo" component={EditTodo} />

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
