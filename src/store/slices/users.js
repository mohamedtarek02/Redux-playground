import { createSlice } from "@reduxjs/toolkit";

const initialState = { userId: null, showUser: true, userData: null };

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    fetchNewUser(state, action) {
      state.userId += action.payload;
    },
    toggle(state) {
      state.showUser = !state.showUser;
    },
    addUser(state, action) {
      state.showUser = true;
      state.userData = action.payload;
    },
  },
});

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;
