import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

import { UserOrders, OrderItem as OrderItemProps } from "../../util/types";
import PressableIcon from "../ui/PressableIcon";
import { deleteMyOrdersAction } from "../../store/actions/orders-actions";
import OrderItem from "./OrderItem";

const OrderList = () => {
  const { userOrders, orderTotal } = useSelector((state: any) => state.order);
  const user = useSelector((state: any) => state.auth.userCredentials);
  const dispatch = useDispatch();

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
      <Fragment>
        <View style={styles.ordersList}>
          {userOrders.map((usOrder: UserOrders) => {
            return usOrder.orders.map(
              (orderItem: OrderItemProps, index: number) => (
                <OrderItem {...orderItem} key={index} />
              ),
            );
          })}
        </View>
        <Text style={styles.total}>Total: ${orderTotal.toFixed(2)}</Text>
        <View style={styles.clearOrdersBtn}>
          <PressableIcon
            name="delete"
            onPress={clearMyOrdersHandler}
            config={{ tintColor: "red" }}
          />
        </View>
      </Fragment>
    );
  }

  return orderContent;
};

export default OrderList;

const styles = StyleSheet.create({
  fallbackContainer: {
    paddingVertical: 10,
  },
  fallbackText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  ordersList: {
    width: "80%",
    alignSelf: "center",
    marginVertical: 20,
    gap: 15,
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
