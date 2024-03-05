import { Dispatch } from "redux";

import { fetchUserOrders } from "../../util/order";
import { ordersSliceActions } from "../slices/orders-slice";

export function fetchOrdersAction(loggedInUserId: string) {
  return async (dispatch: Dispatch) => {
    const userOrders = await fetchUserOrders(loggedInUserId);
    dispatch(ordersSliceActions.setUserOrders(userOrders));
  };
}
