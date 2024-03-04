import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, Text, Alert } from "react-native";

import Button from "../components/ui/Button";
import { coffeeSliceActions } from "../store/slices/coffee-slice";
import { ScreenParamList } from "../util/types";

const CheckOutScreen: React.FC<ScreenParamList> = ({ navigation }) => {
  const { totalAmount, cart } = useSelector((state: any) => state.coffee);
  const userCredentials = useSelector(
    (state: any) => state.auth.userCredentials,
  );
  const dispatch = useDispatch();

  const confirmPurchaseHandler = () => {
    Alert.alert("Purchase successful", "Proceed", [
      {
        text: "Continue",
        onPress: () => {
          dispatch(coffeeSliceActions.clearCart());
          navigation.navigate("BottomTabs");
        },
      },
    ]);
    console.log("Your order");
    const orderData = {
      cart,
      totalAmount,
      userData: {
        emailAddress: userCredentials.users[0].email,
        userName: userCredentials.users[0].email.split("@")[0],
        userAddress: "New York City, 5th Avenue, Manhattan",
      },
      orderDate: {
        date: new Date().toISOString().split("T")[0],
        time: new Date().toISOString().split("T")[1].slice(0, 8),
      },
    };
    console.log(orderData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.total}>Total amount: ${totalAmount.toFixed(2)}</Text>
      {userCredentials && (
        <Text style={styles.email}>{userCredentials.users[0].email}</Text>
      )}
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
    flexDirection: "column",
    gap: 25,
    backgroundColor: "#764D0A",
    paddingVertical: 22,
  },
  total: {
    textAlign: "center",
    color: "white",
    fontSize: 25,
    letterSpacing: 2,
  },
  email: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
  },
  confirmButton: {
    backgroundColor: "#635AFC",
    width: "40%",
    alignSelf: "center",
    padding: 4,
    borderRadius: 8,
  },
});
