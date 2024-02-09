import React from "react";
import { Text, View, StyleSheet } from "react-native";

const CartScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Text>Cart Screen!</Text>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
