import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

import { OrderItem as OrderItemProps } from "../../util/types";

const OrderItem: FC<OrderItemProps> = orderItem => {
  return (
    <View style={styles.orderItem}>
      <Text style={styles.text}>{orderItem.title}</Text>
      <Text style={styles.text}>
        ${typeof orderItem.price === "number" && orderItem.price.toFixed(2)}
      </Text>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
