import { configureStore } from "@reduxjs/toolkit";

import uiSliceReducer from "./slices/ui-slice";
import coffeeSliceReducer from "./slices/coffee-slice";
import authSliceReducer from "./slices/auth-slice";

const store = configureStore({
  reducer: {
    ui: uiSliceReducer,
    coffee: coffeeSliceReducer,
    auth: authSliceReducer,
  },
});

export default store;
