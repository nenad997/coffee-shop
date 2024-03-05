import { Alert } from "react-native";

import { FIREBASE_URL } from "../../../variables";

export async function createOrder(data: any) {
  const response = await fetch(`${FIREBASE_URL}/order.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    if (!response.ok) {
      throw new Error("Could not create a new order, please try again later!");
    }

    await response.json();
  } catch (error: any) {
    Alert.alert(error.message);
  }
}
