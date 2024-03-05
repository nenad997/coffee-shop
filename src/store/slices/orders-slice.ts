import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "order",
  initialState: {
    userOrders: [],
    orderTotal: 0,
  },
  reducers: {
    setUserOrders: (state, action) => {
      state.userOrders = action.payload;

      const calculateOrderTotal = (order: any) => {
        return order.orders.reduce(
          (total: number, item: any) => total + +item.price,
          0,
        );
      };

      const calculateTotalPrice = () => {
        const totalPrice =
          state.userOrders &&
          state.userOrders.reduce(
            (total: number, order: any) => total + calculateOrderTotal(order),
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
