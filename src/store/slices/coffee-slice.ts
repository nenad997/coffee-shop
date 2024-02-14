import { createSlice } from "@reduxjs/toolkit";

import { Coffee } from "../../util/types";

const initialState: {
  coffees: Coffee[];
  filter: string;
  selectedCoffee: null;
} = {
  coffees: [],
  filter: "Cappuccino",
  selectedCoffee: null,
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
      const updatedCoffees: Coffee[] = state.coffees.map((coffee: Coffee) => {
        if(coffee.id === action.payload) {
          return {
            ...coffee,
            isFavorite: !coffee.isFavorite
          }
        } else {
          return coffee;
        }
      });

      state.coffees = updatedCoffees;
      // const foundCoffeeIndex: number = state.coffees.findIndex(
      //   (coffee: Coffee) => coffee.id === action.payload.id,
      // );

      // if (!foundCoffeeIndex || foundCoffeeIndex === -1) {
      //   return;
      // }

      // const foundCoffee = state.coffees[foundCoffeeIndex];

      // foundCoffee.isFavorite = !foundCoffee.isFavorite;
    },
    getCoffee: (state, action) => {
      state.selectedCoffee = action.payload;
    },
  },
});

export default coffeeSlice.reducer;

export const coffeeSliceActions = coffeeSlice.actions;
