import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskLists: [],
};

const taskReducer = createSlice({
  name: "taskReducer",
  initialState,
  reducers: {
    setTask: (state, action) => {
      state.taskLists = action.payload;
    },

    createTask: (state, action) => {
      state.taskLists = [action.payload, ...state.taskLists];
    },

    deleteTask: (state, action) => {
      if (action.payload) {
        state.taskLists = state.taskLists.filter((item) => item.id !== action.payload);
      }
    },

    updateTask: (state, action) => {
      const { id, text } = action.payload;
      const index = state.taskLists.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.taskLists[index] = { ...state.taskLists[index], text };
      }
    },
  },
});

export const { setTask, createTask, deleteTask, updateTask } = taskReducer.actions;

export default taskReducer.reducer;
