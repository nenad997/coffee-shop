import { Alert } from "react-native";

import { FIREBASE_URL } from "../../variables";

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

export async function fetchUserOrders(loggedInUserId: string) {
  const response = await fetch(`${FIREBASE_URL}/order.json`);

  const transformedData = [];

  try {
    if (!response.ok) {
      throw new Error(
        "Could not get orders, please check your internet connection or try again later!",
      );
    }

    const responseData = await response.json();

    for (let key in responseData) {
      if (
        responseData[key].userData.userId.toString() ===
        loggedInUserId.toString()
      ) {
        transformedData.push({
          orderId: key,
          orders: responseData[key].cart.map((item: any) => {
            return {
              title: `${item.title} - ${item.addition}`,
              price: +item.price,
            };
          }),
        });
      }
    }

    return transformedData;
  } catch (error: any) {
    Alert.alert(error.message);
  }
}
