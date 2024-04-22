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
        method: "PATCH",
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

export function setFavotiteCoffeesAction(data: {
  coffee: {
    imageUri: string;
    title: string;
    addition: string;
    userId: string;
  };
}) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(`${URL}/favorites.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to set favorite coffee");
      }

      await response.json();
    } catch (error) {
      dispatch(
        uiSliceAction.setError({
          message: "Failed to set favorite coffee",
        }),
      );
    }
  };
}

export function getFavoriteCoffeesAction(loggedInUserId: string) {
  return async (dispatch: Dispatch) => {
    try {
      let favoriteCoffees: {
        id: string;
        imageUri: string;
        title: string;
        addition: string;
        userId: string;
      }[] = [];

      const response = await fetch(`${URL}/favorites.json`);

      if (!response.ok) {
        throw new Error("Failed to get favorite coffees");
      }

      const responseData = await response.json();

      for (let key in responseData) {
        if (
          responseData[key].coffee.userId.toString() ===
          loggedInUserId?.toString()
        ) {
          favoriteCoffees.push({
            id: key,
            userId: responseData[key].coffee.userId,
            addition: responseData[key].coffee.addition,
            imageUri: responseData[key].coffee.imageUri,
            title: responseData[key].coffee.title,
          });
        }
      }
      dispatch(
        coffeeSliceActions.getFavoriteCoffees(favoriteCoffees.reverse()),
      );
      // console.log(responseData);
    } catch (error) {
      dispatch(
        uiSliceAction.setError({
          message: "Failed to get favorite coffees",
        }),
      );
    }
  };
}
