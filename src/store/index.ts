import { configureStore } from "@reduxjs/toolkit";

import uiSliceReducer from "./slices/ui-slice";
import coffeeSliceReducer from "./slices/coffee-slice";
import authSliceReducer from "./slices/auth-slice";
import ordersSliceReducer from "./slices/orders-slice";

const store = configureStore({
  reducer: {
    ui: uiSliceReducer,
    coffee: coffeeSliceReducer,
    auth: authSliceReducer,
    order: ordersSliceReducer,
  },
});

export default store;
