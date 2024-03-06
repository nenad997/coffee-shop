import React, { useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { Colors } from "../constants/colors";
import PressableIcon from "../components/ui/PressableIcon";
import {
  fetchOrdersAction,
  deleteMyOrdersAction,
} from "../store/actions/orders-actions";
import { ScreenParamList, UserOrders, OrderItem } from "../util/types";

const OrdersScreen: FC<ScreenParamList> = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.userCredentials);
  const { userOrders, orderTotal } = useSelector((state: any) => state.order);

  const clearMyOrdersHandler = () => {
    const orderIds: string[] = [];

    for (const userOrder of userOrders) {
      if (userOrder.userId.toString() === user.users[0].localId.toString()) {
        orderIds.push(userOrder.orderId);
      }
    }

    dispatch<any>(deleteMyOrdersAction(orderIds));
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
        {userOrders.map((usOrder: UserOrders) => {
          return usOrder.orders.map((orderItem: OrderItem, index: number) => (
            <View
              style={styles.orderItem}
              key={index}
            >
              <Text style={styles.text}>{orderItem.title}</Text>
              <Text style={styles.text}>
                $
                {typeof orderItem.price === "number" &&
                  orderItem.price.toFixed(2)}
              </Text>
            </View>
          ));
        })}
      </View>
    );
  }

  useEffect(() => {
    dispatch<any>(fetchOrdersAction(user.users[0].localId));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      {orderContent}
      {userOrders && (
        <Text style={styles.total}>Total: ${orderTotal.toFixed(2)}</Text>
      )}
      {userOrders && userOrders.length > 0 && (
        <View style={styles.clearOrdersBtn}>
          <PressableIcon
            name="delete"
            onPress={clearMyOrdersHandler}
            config={{ tintColor: "red" }}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  fallbackContainer: {
    paddingVertical: 10,
  },
  fallbackText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
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
  clearOrdersBtn: {
    alignSelf: "center",
    marginTop: 20,
  },
});
