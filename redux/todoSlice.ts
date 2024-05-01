import { createSlice, nanoid } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addtodo: (state, {payload }) => {
      const {title} = payload
      const newtodo = {
        title
      };
      state.push(newtodo);
    },
    deletetodo: (state, action) => {
      console.log(action.payload.id);
      console.log(state);
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addtodo, deletetodo } = todoSlice.actions;

export default todoSlice.reducer;
