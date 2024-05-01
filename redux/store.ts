import { configureStore, combineReducers } from '@reduxjs/toolkit';
import taskReducer from './todoSlice';

const rootReducer = combineReducers({
  tasks: taskReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
