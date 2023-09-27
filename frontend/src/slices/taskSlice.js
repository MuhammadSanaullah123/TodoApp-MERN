import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasksInfo: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasksInfo = Object.values(action.payload);
    },
    clearTasks: (state, action) => {
      state.tasksInfo = [];
    },
  },
});

export const { setTasks, clearTasks } = taskSlice.actions;

export default taskSlice.reducer;
