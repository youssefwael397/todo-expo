import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  Icon,
  Fab,
  ScrollView,
  Pressable,
  IconButton,
  Switch,
  Checkbox,
} from 'native-base';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Todo, deleteTodoById, toggleTodoComplete } from '../redux/todoSlice';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { colors } from '../utils/theme/colors';

const TodoApp = () => {
  const { todos, loading } = useSelector((state: RootState) => state.todos) as {
    todos: ITodo[];
    loading: boolean;
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'all', title: 'All' },
    { key: 'pending', title: 'Pending' },
    { key: 'completed', title: 'Completed' },
  ]);

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const onToggleSwitch = async (todoId: number) => {
    console.log('onToggleSwitch with id: ' + todoId);
    await dispatch(toggleTodoComplete(todoId));
  };

  const handleDelete = async (todoId: number) => {
    await dispatch(deleteTodoById(todoId));
  };

  const handleTaskPress = (todo: ITodo) => {
    navigation.navigate('EditTodo', { todo });
  };

  const renderScene = SceneMap({
    all: () => (
      <View style={{ paddingTop: 50, marginTop: 0 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {todos.map((task, index) => renderTaskRow(task))}
        </ScrollView>
      </View>
    ),
    pending: () => (
      <View style={{ paddingTop: 50, marginTop: 0 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {todos
            .filter((task: Todo) => !task.completed)
            .map((task, index) => renderTaskRow(task))}
        </ScrollView>
      </View>
    ),
    completed: () => (
      <View style={{ paddingTop: 50, marginTop: 0 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {todos
            .filter((task: Todo) => task.completed)
            .map((task, index) => renderTaskRow(task))}
        </ScrollView>
      </View>
    ),
  });

  const renderTabBar = (props: any) => (
    <TabBar
      indicatorStyle={{ backgroundColor: colors.gray400 }} // Change the color of the active tab underline
      {...props}
      style={{
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
      }}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={{
            color: focused ? colors.blu500 : colors.gray500,
            fontWeight: focused ? 'bold' : 'normal',
            width: '100%',
          }}
        >
          {route.title}
        </Text>
      )}
    />
  );

  const renderTaskRow = (task: ITodo) => (
    <View style={styles.taskRow}>
      <Checkbox
        isChecked={task.completed}
        onChange={() => onToggleSwitch(task.id)}
        colorScheme={colors.blu500}
        marginRight={5}
        style={{
          borderRadius: 100,
          width: 20,
          height: 20,
          borderWidth: 1,
          borderColor: task.completed ? colors.blu500 : colors.gray500,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        value={''}
      />
      <Text>
        {task.title.length > 30
          ? `${task.title.substring(0, 30)}...`
          : task.title}
      </Text>
      <IconButton
        icon={<Feather name="edit" size={18} color={colors.blu500} />}
        onPress={() => handleTaskPress(task)} // Navigate to edit screen
        size="sm"
        variant="unstyled"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {todos.length > 0 ? (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
        />
      ) : (
        <Text>Start progress in new task</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default TodoApp;
