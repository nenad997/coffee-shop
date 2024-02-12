import { Coffee } from "./types";

export async function getAllCoffees() {
  const response = await fetch(
    "https://coffee-shop-app-366b1-default-rtdb.europe-west1.firebasedatabase.app/coffee.json",
  );
  const responseData = await response.json();

  const coffees: Coffee[] = [];

  for (let key in responseData) {
    coffees.push({
      id: key,
      imageUri: responseData[key].imageUri,
      addition: responseData[key].addition,
      coffeeType: responseData[key].coffeeType,
      price: responseData[key].price,
      rating: responseData[key].rating,
      title: responseData[key].title,
    });
  }

  return coffees;
}
