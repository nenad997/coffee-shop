import { createSlice } from "@reduxjs/toolkit";

import { Coffee } from "../../util/types";

const initialState: {
  coffees: Coffee[];
  filter: string;
} = {
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
    toggleFavorite: (state, action) => {
      const updatedCoffes: Coffee[] = state.coffees.map((coffee: Coffee) => {
        if (coffee.id === action.payload) {
          return {
            ...coffee,
            isFavorite: !coffee.isFavorite,
          };
        } else {
          return coffee;
        }
      });

      state.coffees = updatedCoffes;
    },
  },
});

export default coffeeSlice.reducer;

export const coffeeSliceActions = coffeeSlice.actions;
