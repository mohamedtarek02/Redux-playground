import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counter";
import authSlice from "./slices/auth";

const countStore = configureStore({
  reducer: { counter: counterSlice, auth: authSlice },
});

export default countStore;
