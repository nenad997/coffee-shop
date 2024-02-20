import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  authToken: "",
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
  },
});

export default authSlice.reducer;

export const authSliceActions = authSlice.actions;
