import { createSlice } from "@reduxjs/toolkit";

import { Coffee, CartItemProps } from "../../util/types";

const initialState: {
  coffees: Coffee[];
  filter: string;
  cart: CartItemProps[];
  qty: number;
} = {
  coffees: [],
  filter: "Cappuccino",
  cart: [],
  qty: 0,
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
          id: newCartItem.id,
          title: newCartItem.title,
          addition: newCartItem.addition,
          coffeeType: newCartItem.coffeeType,
          imageUri: newCartItem.imageUri,
          isFavorite: newCartItem.isFavorite,
          price: newCartItem.price,
          rating: newCartItem.rating,
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
    },
  },
});

export default coffeeSlice.reducer;

export const coffeeSliceActions = coffeeSlice.actions;
