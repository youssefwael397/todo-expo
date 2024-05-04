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
  todos: [
    {
      id: 2,
      title: 'create neww tasskkkkk\n',
      completed: false,
      userId: 1,
    },
    {
      id: 3,
      title: 'new',
      completed: true,
      userId: 1,
    },
    {
      id: 4,
      title: 'asdasdasdasd',
      completed: false,
      userId: 1,
    },
    {
      id: 5,
      title: 'aSdasdasd',
      completed: true,
      userId: 1,
    },
    {
      id: 6,
      title: 'asdasdasdaa',
      completed: true,
      userId: 1,
    },
    {
      id: 7,
      title: 'la;ks;daksd',
      completed: false,
      userId: 1,
    },
    {
      id: 4,
      title: 'asdasdasdasd',
      completed: false,
      userId: 1,
    },
    {
      id: 5,
      title: 'aSdasdasd',
      completed: true,
      userId: 1,
    },
    {
      id: 6,
      title: 'asdasdasdaa',
      completed: true,
      userId: 1,
    },
    {
      id: 7,
      title: 'la;ks;daksd',
      completed: false,
      userId: 1,
    },
  ],
  loading: false,
  error: null,
};

// Async thunk to fetch todos by user ID
export const getTodosByUserId = createAsyncThunk(
  'todos/getTodosByUserId',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosJwt.get(`/todos`);
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
      const url = '/todos';
      const response = await AxiosJwt.post(url, { title });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk to update a new todo
export const updateTodo = createAsyncThunk(
  'todos/update',
  async (todo: Todo, { rejectWithValue }) => {
    try {
      const url = `/todos`;
      const response = await AxiosJwt.put(url, { todo });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk to delete a todo by ID
export const deleteTodoById = createAsyncThunk(
  'todos/deleteTodoById',
  async (todoId: number, { rejectWithValue }) => {
    try {
      await AxiosJwt.delete(`/todos/${todoId}`);
      return todoId;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk to toggle the completion status of a todo
export const toggleTodoComplete = createAsyncThunk(
  'todos/toggleTodoComplete',
  async (todoId: number, { rejectWithValue }) => {
    try {
      const response = await AxiosJwt.get(`/todos/toggle/${todoId}`);
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
      console.log('🚀 ~ payload:', payload);
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
    ResetError: (state) => {
      state.error = null;
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
      state.todos = action.payload.data;
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
      state.todos.push(action.payload.data);
    });
    builder.addCase(createNewTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle loading and error for updateTodo
    builder.addCase(updateTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.loading = false;
      const newTodos = state.todos.map((item) =>
        item.id == action.payload.data.id ? action.payload.data : item
      );
      state.todos = newTodos;
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle loading and error for deleteTodoById
    builder.addCase(deleteTodoById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTodoById.fulfilled, (state, action) => {
      console.log('🚀 ~ builder.addCase ~ action:', action);
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
      const toggledTodoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.data.id
      );

      if (toggledTodoIndex !== -1) {
        state.todos[toggledTodoIndex].completed =
          !state.todos[toggledTodoIndex].completed;
      }
    });

    builder.addCase(toggleTodoComplete.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { addtodo, deletetodo, ResetError } = todoSlice.actions;

export default todoSlice.reducer;
