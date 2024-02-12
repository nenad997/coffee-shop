import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLoading: false,
  },
  reducers: {},
});

export default uiSlice.reducer;
