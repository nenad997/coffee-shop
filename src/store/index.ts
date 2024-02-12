import { configureStore } from "@reduxjs/toolkit";

import uiSliceReducer from "./slices/ui-slice";
import coffeeSliceReducer from "./slices/coffee-slice";

const store = configureStore({
  reducer: {
    ui: uiSliceReducer,
    coffee: coffeeSliceReducer,
  },
});

export default store;
