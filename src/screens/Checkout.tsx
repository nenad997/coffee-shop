import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Text } from "react-native";

import Button from "../components/ui/Button";

const CheckOutScreen = () => {
  const totalAmount = useSelector((state: any) => state.coffee.totalAmount);
  const userCredentials = useSelector(
    (state: any) => state.auth.userCredentials,
  );

  console.log(userCredentials)

  const confirmPurchaseHandler = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.total}>Total amount: ${totalAmount.toFixed(2)}</Text>
      {userCredentials && <Text>{userCredentials.users[0].email}</Text>}
      <Button style={styles.confirmButton} onPress={confirmPurchaseHandler}>
        Confirm
      </Button>
    </View>
  );
};

export default CheckOutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#764D0A",
    paddingVertical: 22,
  },
  total: {
    textAlign: "center",
    color: "white",
    fontSize: 25,
    letterSpacing: 2,
  },
  confirmButton: {
    backgroundColor: "#635AFC",
    width: "40%",
    alignSelf: "center",
    marginTop: 30,
    padding: 4,
    borderRadius: 8,
  },
});
