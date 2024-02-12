import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coffees: [],
  filter: "Cappuccino",
};

const coffeeSlice = createSlice({
  name: "coffee",
  initialState,
  reducers: {
    replaceState: (state, action) => {
      state.coffees = action.payload;
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export default coffeeSlice.reducer;

export const coffeeSliceActions = coffeeSlice.actions;
