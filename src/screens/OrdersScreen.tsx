import React, { useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, StyleSheet, ScrollView } from "react-native";

import { Colors } from "../constants/colors";
import {
  fetchOrdersAction,
} from "../store/actions/orders-actions";
import { ScreenParamList } from "../util/types";
import OrderList from "../components/Order/OrderList";

const OrdersScreen: FC<ScreenParamList> = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.userCredentials);

  useEffect(() => {
    dispatch<any>(fetchOrdersAction(user.users[0].localId));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      <OrderList />
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
});
