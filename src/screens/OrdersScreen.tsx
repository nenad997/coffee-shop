import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { Colors } from "../constants/colors";

const OrdersScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      <View style={styles.ordersList}>
        <View style={styles.orderItem}>
          <Text style={[styles.text, styles.title]}>Coffee</Text>
          <Text style={[styles.text, styles.price]}>$Price</Text>
        </View>
        <View style={styles.orderItem}>
          <Text style={[styles.text, styles.title]}>Coffee</Text>
          <Text style={[styles.text, styles.price]}>$Price</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBg,
    flex: 1,
  },
  header: {
    color: "white",
    textAlign: "center",
    fontSize: 33,
    marginTop: 10,
    letterSpacing: 2,
    borderBottomWidth: 3,
    borderBottomColor: "yellow",
    width: "80%",
    alignSelf: "center",
    paddingVertical: 10,
  },
  ordersList: {
    width: "80%",
    alignSelf: "center",
    marginVertical: 20,
    gap: 15,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 25,
  },
  title: {},
  price: {},
});
