import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { authApi, type AuthUser } from "./api/auth-api";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearCredentials(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    // On successful login, populate auth state
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.isAuthenticated = true;
      },
    );

    // On successful getMe, populate auth state
    builder.addMatcher(
      authApi.endpoints.getMe.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        state.isAuthenticated = true;
      },
    );

    // On getMe failure, clear auth state
    builder.addMatcher(authApi.endpoints.getMe.matchRejected, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });

    // On successful logout, clear auth state
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
