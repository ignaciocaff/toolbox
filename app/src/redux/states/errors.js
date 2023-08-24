import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const errorSlice = createSlice({
  name: "error",
  initialState: initialState,
  reducers: {
    setError: (_, action) => action.payload,
    clearError: () => null,
  },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
