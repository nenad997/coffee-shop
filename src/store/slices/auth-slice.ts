import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  authToken: "",
  userCredentials: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.authToken = action.payload;
      state.isAuth = true;
    },
    logout: (state, action: { payload?: any }) => {
      state.authToken = "";
      state.isAuth = false;
    },
    setUserCredentials: (state, action) => {
      state.userCredentials = action.payload;
    },
  },
});

export default authSlice.reducer;

export const authSliceActions = authSlice.actions;
