import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { USER_LOGIN, USER_TOKEN, getStore } from '../../utils/config';

const initialState = {
  userLogin: getStore(USER_LOGIN),
  userToken: getStore(USER_TOKEN),
  userProfile: {}
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    // Define Action here
    loginAction: (state, actions) => {
      state.userLogin = actions.payload.userLogin;
      state.userToken = actions.payload.userToken;
    },
    getProfileAction: (state, actions) => {
      state.userProfile = actions.payload
    }
  },
});

export const { loginAction, getProfileAction } = userReducer.actions

export default userReducer.reducer






