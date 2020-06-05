import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    nickname: null,
    dashboard: null,
    token: null,
    success: false,
  },
  reducers: {
    loginUser: (state, { payload }) => ({
      id: payload._id,
      nickname: payload.nickname,
      dashboard: payload.dashboard,
      token: payload.token,
    }),
    logOutUser: (state, { payload }) => ({ ...state }),
    refreshUser: (state, payload) => ({
      nickname: payload.nickname,
    }),
  },
});
