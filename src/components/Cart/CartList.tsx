import React, { FC, Fragment } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { CartItemProps } from "../../util/types";
import CartItem from "./CartItem";
import Button from "../ui/Button";
import { Colors } from "../../constants/colors";

const CartList: FC<{
  cart: CartItemProps[];
}> = ({ cart }) => {
  return (
    <Fragment>
      <FlatList
        style={styles.list}
        data={cart}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return <CartItem item={item} />;
        }}
      />
      <View style={{ alignItems: "center" }}>
        <Button style={styles.button} onPress={() => {}}>
          Buy Now
        </Button>
      </View>
    </Fragment>
  );
};

export default CartList;

const styles = StyleSheet.create({
  list: {
    margin: 20,
  },
  button: {
    backgroundColor: Colors.orangePrimary,
    borderRadius: 25,
    width: "30%",
    padding: 5,
    marginBottom: 20,
  },
});
