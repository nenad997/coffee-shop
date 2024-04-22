import { createSlice } from "@reduxjs/toolkit";

import { Coffee, CartItemProps, CoffeeState } from "../../util/types";

const initialState: CoffeeState = {
  coffees: [],
  cart: [],
  totalAmount: 0,
  filteredCoffees: [],
  favoriteCoffees: [],
};

const coffeeSlice = createSlice({
  name: "coffee",
  initialState,
  reducers: {
    replaceState: (state, action: { payload: Coffee[] }) => {
      state.coffees = action.payload;
    },
    filterCoffees: (state, action: { payload: string }) => {
      const searchTerm = action.payload.toLowerCase();
      const filteredCoffees = state.coffees.filter((coffee: Coffee) =>
        coffee.title?.toLowerCase().includes(searchTerm),
      );
      state.filteredCoffees = filteredCoffees;
    },
    toggleFavorite: (state, action: { payload: string }) => {
      const updatedCoffees: Coffee[] = state.coffees.map((coffee: Coffee) => {
        if (coffee.id === action.payload) {
          return {
            ...coffee,
            isFavorite: !coffee.isFavorite,
          };
        } else {
          return coffee;
        }
      });

      state.coffees = updatedCoffees;
    },
    addToCart: (state, action: { payload: any }) => {
      const newCartItem = action.payload;

      const existingCartItemIndex: number = state.cart.findIndex(
        (item: CartItemProps) => item.id === newCartItem.id,
      );

      const existingCartItem = state.cart[existingCartItemIndex];

      if (!existingCartItem) {
        state.cart.push({
          ...newCartItem,
          qty: 1,
          totalPrice: newCartItem.price,
        });
      } else {
        const newCartItem: CartItemProps = {
          ...existingCartItem,
          qty: existingCartItem.qty + 1,
          totalPrice: existingCartItem.totalPrice + existingCartItem.price,
        };

        state.cart[existingCartItemIndex] = newCartItem;
      }
      state.totalAmount += newCartItem.price;
    },
    removeFromCart: (state, action: { payload: string }) => {
      const existingCartItemIndex: number = state.cart.findIndex(
        (item: CartItemProps) => item.id === action.payload,
      )!;

      const existingCartItem: CartItemProps = state.cart[existingCartItemIndex];

      if (existingCartItem.qty === 1) {
        state.cart = state.cart.filter(
          (item: CartItemProps) => item.id !== action.payload,
        );
      } else {
        const updatedCartItems = state.cart.map((item: CartItemProps) => {
          if (item.id === action.payload && item.qty > 1) {
            return {
              ...item,
              qty: item.qty - 1,
              totalPrice: item.totalPrice - item.price,
            };
          } else {
            return item;
          }
        });

        state.cart = updatedCartItems;
      }

      state.totalAmount -= existingCartItem.price;
    },
    clearCart: (state, action: { payload?: any }) => {
      state.cart = [];
      state.totalAmount = 0;
    },
    getFavoriteCoffees: (state, action) => {
      state.favoriteCoffees = action.payload;
    },
  },
});

export default coffeeSlice.reducer;

export const coffeeSliceActions = coffeeSlice.actions;
