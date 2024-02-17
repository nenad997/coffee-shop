import { Dispatch } from "redux";

import { coffeeSliceActions } from "../slices/coffee-slice";
import { uiSliceAction } from "../slices/ui-slice";
import { Coffee } from "../../util/types";
import { FIREBASE_URL } from "../../../variables";

const URL = FIREBASE_URL;

export function getCoffees() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(uiSliceAction.setIsLoading(true));
      const response = await fetch(`${URL}/coffee.json`);

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
          isFavorite: responseData[key].isFavorite,
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

export function updateCoffeAction(coffeeId: string, coffeeData: Coffee) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(`${URL}/coffee/${coffeeId}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coffeeData),
      });

      if (!response.ok) {
        throw new Error("Failed to update coffee");
      }

      await response.json();

      dispatch(coffeeSliceActions.toggleFavorite(coffeeId));
    } catch (error) {
      dispatch(
        uiSliceAction.setError({
          message: "Failed to update coffee",
        }),
      );
    }
  };
}
