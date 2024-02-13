import { Dispatch } from "redux";

import { coffeeSliceActions } from "../slices/coffee-slice";
import { uiSliceAction } from "../slices/ui-slice";
import { Coffee } from "../../util/types";

const FIREBASE_URL =
  "https://coffee-shop-app-366b1-default-rtdb.europe-west1.firebasedatabase.app";

export function getCoffees() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(uiSliceAction.setIsLoading(true));
      const response = await fetch(`${FIREBASE_URL}/coffee.json`);

      if (!response.ok) {
        throw new Error("Failed to fetch coffees");
      }

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

      dispatch(coffeeSliceActions.replaceState(coffees.reverse()));
    } catch (error) {
      dispatch(
        uiSliceAction.setError({
          message: "Failed to fetch coffees",
        }),
      );
    }
    dispatch(uiSliceAction.setIsLoading(false));
  };
}
