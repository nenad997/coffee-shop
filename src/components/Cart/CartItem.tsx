import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet, Text } from "react-native";

import { CartItemProps } from "../../util/types";
import PressableIcon from "../ui/PressableIcon";
import { coffeeSliceActions } from "../../store/slices/coffee-slice";

const CartItem: FC<{
  item: CartItemProps;
}> = ({ item }) => {
  const dispatch = useDispatch();

  const removeItemFromCartHandler = () => {
    dispatch(coffeeSliceActions.removeFromCart(item.id));
  };

  const increaseCartQuantity = () => {
    dispatch(coffeeSliceActions.addToCart(item));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {item.title} - {item.addition}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.price}>
          $ {item.totalPrice.toFixed(2)} {`(${item.qty}`} &times;{" "}
          {`$ ${item.price.toFixed(2)})`}
        </Text>
        <Text style={styles.qty}>Quantity: {item.qty}</Text>
      </View>
      <View style={styles.actions}>
        <PressableIcon
          name={item.qty > 1 ? "minus" : "delete"}
          config={{ tintColor: item.qty > 1 ? "white" : "red" }}
          onPress={removeItemFromCartHandler}
        />
        <PressableIcon
          name="add"
          config={{
            tintColor: "white",
          }}
          onPress={increaseCartQuantity}
        />
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    gap: 10,
    borderBottomWidth: 3,
    borderBottomColor: "blue",
    padding: 5,
  },
  text: {
    color: "white",
    fontSize: 25,
  },
  price: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  qty: {
    color: "white",
    fontSize: 20,
  },
  actions: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 15,
  },
});
