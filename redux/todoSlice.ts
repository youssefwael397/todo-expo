import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AxiosJwt from '../axios/api';

// Define the Todo interface
export interface Todo {
  id?: number;
  userId?: number;
  completed?: boolean;
  title: string;
}

// Initial state with an array of Todo objects
interface TodosState {
  todos: Todo[];
  loading: boolean; // Add loading indicator to state
  error: any; // Add error handling
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

// Async thunk to fetch todos by user ID
export const getTodosByUserId = createAsyncThunk(
  'todos/getTodosByUserId',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosJwt.get(`/api/todos`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Async thunk to create a new todo
export const createNewTodo = createAsyncThunk(
  'todos/createNewTodo',
  async (title: string, { rejectWithValue }) => {
    try {
      // Example URL and Axios post request, adjust as needed
      const url = '/api/todos';
      const response = await AxiosJwt.post(url, { title });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Async thunk to delete a todo by ID
export const deleteTodoById = createAsyncThunk(
  'todos/deleteTodoById',
  async (todoId: number, { rejectWithValue }) => {
    try {
      await AxiosJwt.delete(`/api/todos/${todoId}`);
      return todoId;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Async thunk to toggle the completion status of a todo
export const toggleTodoComplete = createAsyncThunk(
  'todos/toggleTodoComplete',
  async (todoId: number, { rejectWithValue }) => {
    try {
      const response = await AxiosJwt.get(`/api/todos/toggle/${todoId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addtodo: (state, { payload }) => {
      const { title } = payload;
      const newTodo: Todo = {
        title,
        completed: false, // Assuming a new todo is always created as incomplete
      };
      state.todos.push(newTodo);
    },
    deletetodo: (state, action) => {
      const idToDelete = action.payload.id;
      state.todos = state.todos.filter((todo) => todo.id !== idToDelete);
    },
  },
  extraReducers: (builder) => {
    // Handle loading and error for getTodosByUserId
    builder.addCase(getTodosByUserId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTodosByUserId.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    });
    builder.addCase(getTodosByUserId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle loading and error for createNewTodo
    builder.addCase(createNewTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createNewTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos.push(action.payload);
    });
    builder.addCase(createNewTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle loading and error for deleteTodoById
    builder.addCase(deleteTodoById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTodoById.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    });
    builder.addCase(deleteTodoById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle loading and error for toggleTodoComplete
    builder.addCase(toggleTodoComplete.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(toggleTodoComplete.fulfilled, (state, action) => {
      state.loading = false;
      // Update the todo's completion status
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed;
      }
    });
    builder.addCase(toggleTodoComplete.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { addtodo, deletetodo } = todoSlice.actions;

export default todoSlice.reducer;
