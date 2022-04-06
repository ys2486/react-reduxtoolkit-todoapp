import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { VFC } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginState } from '../../types/loginState';

const apiUrl = 'http://127.0.0.1:8000/';
const token = localStorage.localJWT;

export const fetchAsyncLogin = createAsyncThunk(
  'login/post',
  async (auth: LoginState['authen']) => {
    const res = await axios.post(`${apiUrl}authen/jwt/create`, auth, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res);
    return res.data;
  }
);

export const fetchAsyncRegister = createAsyncThunk(
  'login/register',
  async (auth: LoginState['authen']) => {
    console.log(auth);
    const res = await axios.post(`${apiUrl}api/register/`, auth, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res);
    return res.data;
  }
);

export const fetchAsyncProf = createAsyncThunk('login/prof', async () => {
  const res = await axios.get(`${apiUrl}api/myself/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  console.log(res);
  return res.data;
});

const initialState: LoginState = {
  authen: {
    username: '',
    password: '',
  },
  isLoginView: true,
  profile: {
    id: 0,
    username: '',
  },
};

const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    editUsername(state, action) {
      state.authen.username = action.payload;
    },
    editPassword(state, action) {
      state.authen.password = action.payload;
    },
    toggleMode(state) {
      state.isLoginView = !state.isLoginView;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      // console.log(action);
      localStorage.setItem('localJWT', action.payload.access);
      action.payload.access && (window.location.href = '/tasks');
    });
    builders.addCase(fetchAsyncProf.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});
export const { editUsername, editPassword, toggleMode } = loginSlice.actions;
export const selectAuthen = (state: any) => state.login.authen;
export const selectIsLoginView = (state: any) => state.login.isLoginView;
export const selectProfile = (state: any) => state.login.profile;

export default loginSlice.reducer;
