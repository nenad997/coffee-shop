import { Dispatch } from "redux";

import { fetchUserOrders, deleteMyOrders } from "../../util/order";
import { ordersSliceActions } from "../slices/orders-slice";

export function fetchOrdersAction(loggedInUserId: string) {
  return async (dispatch: Dispatch) => {
    const userOrders = await fetchUserOrders(loggedInUserId);
    dispatch(ordersSliceActions.setUserOrders(userOrders!));
  };
}

export function deleteMyOrdersAction(orderIds: string[]) {
  return async (dispatch: Dispatch) => {
    deleteMyOrders(orderIds)
      .then(() => {
        dispatch(ordersSliceActions.clearUserOrders());
      })
      .catch(error => {});
  };
}
