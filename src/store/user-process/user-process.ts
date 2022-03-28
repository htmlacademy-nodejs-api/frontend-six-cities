import { createSlice } from '@reduxjs/toolkit';

import type { UserProcess } from '../../types/state';
import { fetchUserStatus, loginUser, logoutUser } from '../action';
import { AuthorizationStatus, StoreSlice } from '../../const';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: ''
};

export const userProcess = createSlice({
  name: StoreSlice.UserProcess,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserStatus.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(fetchUserStatus.rejected, (state) => {
        state.user = '';
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = '';
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
