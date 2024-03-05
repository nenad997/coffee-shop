import { FIREBASE_URL } from "../../../variables";

export async function createOrder(data: any) {
  const response = await fetch(`${FIREBASE_URL}/order.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  await response.json();
}
