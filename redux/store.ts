import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todoReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
