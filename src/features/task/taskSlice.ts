import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { ReducerWithInitialState } from '@reduxjs/toolkit/dist/createReducer';
import axios from 'axios';
import { create } from 'domain';
import { taskState } from '../../types/taskState';

const initialState: taskState = {
  tasks: [
    {
      id: 0,
      title: '',
      created_at: '',
      updated_at: '',
    },
  ],
  editedTask: {
    id: 0,
    title: '',
    created_at: '',
    updated_at: '',
  },
  selectedTask: {
    id: 0,
    title: '',
    created_at: '',
    updated_at: '',
  },
};

const apiUrl = 'http://127.0.0.1:8000/api/tasks/';
const token = localStorage.localJWT;

export const fetchAsyncGet = createAsyncThunk('task/get', async () => {
  const res = await axios.get(apiUrl, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  // console.log(res.data);
  return res.data;
});

export const fetchAsyncCreate = createAsyncThunk(
  'task/create',
  async (task: taskState['editedTask']) => {
    const res = await axios.post(apiUrl, task, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    });
    return res.data;
  }
);

export const fetchAsyncDelete = createAsyncThunk(
  'task/detlete',
  async (id: number) => {
    await axios.delete(`${apiUrl}${id}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    });
    return id as number;
  }
);

export const fetchAsyncUpdate = createAsyncThunk(
  'task/update',
  async (task: taskState['editedTask']) => {
    const res = await axios.put(`${apiUrl}${task.id}/`, task, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    });
    return res.data;
  }
);

const TaskSlice = createSlice({
  name: 'task',
  initialState: initialState,
  reducers: {
    editTask(state, action) {
      state.editedTask = action.payload;
    },
    selectTask(state, action) {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      // return {
      //   ...state,
      //   tasks: action.payload,
      // };
      state.tasks = action.payload;
    });
    builder.addCase(fetchAsyncDelete.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      // return {
      //   ...state,
      //   tasks: state.tasks.filter((task) => task.id !== action.payload),
      // };
    });
    builder.addCase(fetchAsyncCreate.fulfilled, (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    });
    builder.addCase(fetchAsyncUpdate.fulfilled, (state, action) => {
      state.tasks = state.tasks.map((t) => {
        return t.id === action.payload.id ? action.payload : t;
      });
      state.selectedTask = action.payload;
      state.editedTask = { id: 0, title: '', created_at: '', updated_at: '' };
    });
  },
});

export const { editTask, selectTask } = TaskSlice.actions;
export const selectTasks = (state: any) => state.task.tasks;
export const selectEditTasks = (state: any) => state.task.editedTask;
export const selectSelectedTasks = (state: any) => state.task.selectedTask;
export default TaskSlice.reducer;
