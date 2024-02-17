import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Text, View, StyleSheet } from "react-native";

import { CartItemProps, ScreenParamList } from "../util/types";
import { Colors } from "../constants/colors";
import CartList from "../components/Cart/CartList";

const CartScreen: FC<ScreenParamList> = () => {
  const cart: CartItemProps[] = useSelector((state: any) => state.coffee.cart);

  if (!cart || cart.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Nothing in cart!</Text>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <CartList cart={cart} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: Colors.screenBg,
    flex: 1,
  },
  text: {
    color: "white",
  },
  fallbackContainer: {
    backgroundColor: Colors.screenBg,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  fallbackText: {
    color: "white",
    fontSize: 24,
  },
});
