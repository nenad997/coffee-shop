import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { Colors } from "../constants/colors";
import { fetchUserOrders } from "../util/order";

const OrdersScreen = () => {
  const [userOrders, setUserOrders] = useState<any>();
  const user = useSelector((state: any) => state.auth.userCredentials);

  const calculateOrderTotal = (order: any) => {
    return order.orders.reduce(
      (total: number, item: any) => total + +item.price,
      0,
    );
  };

  const calculateTotalPrice = () => {
    const totalPrice =
      userOrders &&
      userOrders.reduce(
        (total: number, order: any) => total + calculateOrderTotal(order),
        0,
      );
    return totalPrice.toFixed(2);
  };

  let orderContent = (
    <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackText}>
        No recent orders, start adding some...
      </Text>
    </View>
  );

  if (userOrders && userOrders.length > 0) {
    orderContent = (
      <View style={styles.ordersList}>
        {userOrders.map((usOrder: any) => {
          return usOrder.orders.map((orderItem: any) => (
            <View
              style={styles.orderItem}
              key={usOrder.orderId + Math.random().toString()}
            >
              <Text style={styles.text}>{orderItem.title}</Text>
              <Text style={styles.text}>${orderItem.price.toFixed(2)}</Text>
            </View>
          ));
        })}
      </View>
    );
  }

  useEffect(() => {
    async function getUserOrders() {
      const orders = await fetchUserOrders(user.users[0].localId);
      setUserOrders(orders);
    }
    getUserOrders();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      {orderContent}
      {userOrders && (
        <Text style={styles.total}>Total: ${calculateTotalPrice()}</Text>
      )}
    </ScrollView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  fallbackContainer: {
    paddingVertical: 10
  },
  fallbackText: {
    color: "white",
    textAlign: "center",
    fontSize: 16
  },
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
    fontSize: 18,
    textAlign: "center",
  },
  total: {
    color: "white",
    alignSelf: "flex-end",
    marginHorizontal: 40,
    fontSize: 20,
  },
});
