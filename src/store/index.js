import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./slices/users";

const countStore = configureStore({
  reducer: { users: usersSlice },
});

export default countStore;
