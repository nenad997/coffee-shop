import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "order",
  initialState: {
    userOrders: [],
  },
  reducers: {
    setUserOrders: (state, action) => {
      state.userOrders = action.payload;
    },
    clearUserOrders: (state, action) => {
      state.userOrders = [];
    },
  },
});

export default ordersSlice.reducer;

export const ordersSliceActions = ordersSlice.actions;
