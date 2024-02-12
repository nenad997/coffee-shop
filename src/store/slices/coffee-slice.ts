import { createSlice } from "@reduxjs/toolkit";

import { coffees } from "../../data/coffees";
import { Coffee } from "../../util/types";

const initialState = {
  coffees: coffees,
};

const coffeeSlice = createSlice({
  name: "coffee",
  initialState,
  reducers: {
    searchCoffee: (state, action) => {
      state.coffees = state.coffees.filter((coffee: Coffee) => {
        return coffee.title === action.payload;
      });
    },
  },
});

export default coffeeSlice.reducer;

export const coffeeSliceActions = coffeeSlice.actions;
