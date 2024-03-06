import { createSlice } from "@reduxjs/toolkit";

import { UserOrders, OrderItem } from "../../util/types";

const initialState: {
  userOrders: UserOrders[];
  orderTotal: number;
} = {
  userOrders: [],
  orderTotal: 0,
};

const ordersSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setUserOrders: (state, action: { payload: UserOrders[] }) => {
      state.userOrders = action.payload;

      const calculateOrderTotal = (order: UserOrders) => {
        return order.orders.reduce(
          (total: number, item: OrderItem) => total + +item.price,
          0,
        );
      };

      const calculateTotalPrice = () => {
        const totalPrice = state.userOrders.reduce(
          (total: number, order: UserOrders) =>
            total + calculateOrderTotal(order),
          0,
        );
        return totalPrice.toFixed(2);
      };

      state.orderTotal = +calculateTotalPrice();
    },
    clearUserOrders: (state, action: { payload?: any }) => {
      state.userOrders = [];
      state.orderTotal = 0;
    },
  },
});

export default ordersSlice.reducer;

export const ordersSliceActions = ordersSlice.actions;
