import React, { FC, Fragment } from "react";
import { useSelector } from "react-redux";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CartItemProps } from "../../util/types";
import CartItem from "./CartItem";
import Button from "../ui/Button";
import { Colors } from "../../constants/colors";

const CartList: FC<{
  cart: CartItemProps[];
}> = ({ cart }) => {
  const totalAmount = useSelector((state: any) => state.coffee.totalAmount);
  const navigation = useNavigation<any>();

  const purchaseHandler = () => {
    console.log("Ordered");
    //Register user
    //Show total amount
    //Redirect
    navigation.navigate("checkout");
  };

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
      <Text style={styles.amount}>Total amount: {totalAmount.toFixed(2)}</Text>
      <View style={{ alignItems: "center" }}>
        <Button style={styles.button} onPress={purchaseHandler}>
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
  amount: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
  },
});
