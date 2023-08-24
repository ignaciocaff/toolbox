import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { filesSlice } from "./states/files";
import { spinnerSlice } from "./states/spinner";
import { errorSlice } from "./states/errors";

const reducers = combineReducers({
  files: filesSlice.reducer,
  spinner: spinnerSlice.reducer,
  error: errorSlice.reducer,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
