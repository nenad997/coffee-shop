import { createSlice } from "@reduxjs/toolkit";

import { Coffee, CartItemProps } from "../../util/types";

const initialState: {
  coffees: Coffee[];
  filter: string;
  cart: CartItemProps[];
  totalAmount: number;
  qty: number;
  filteredCoffees: Coffee[];
} = {
  coffees: [],
  filter: "Cappuccino",
  cart: [],
  totalAmount: 0,
  qty: 0,
  filteredCoffees: [],
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
    filterCoffees: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      const filteredCoffees = state.coffees.filter(coffee =>
        coffee.title.toLowerCase().includes(searchTerm),
      );
      state.filteredCoffees = filteredCoffees;
    },
    toggleFavorite: (state, action) => {
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
    addToCart: (state, action) => {
      const newCartItem: CartItemProps = action.payload;

      const existingCartItemIndex = state.cart.findIndex(
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
        const newQty = existingCartItem.qty + 1;
        const totalPrice = existingCartItem.totalPrice + existingCartItem.price;

        const newCartItem: CartItemProps = {
          ...existingCartItem,
          qty: newQty,
          totalPrice,
        };

        state.cart[existingCartItemIndex] = newCartItem;
      }
      state.totalAmount += newCartItem.price;
    },
    removeFromCart: (state, action) => {
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
  },
});

export default coffeeSlice.reducer;

export const coffeeSliceActions = coffeeSlice.actions;
