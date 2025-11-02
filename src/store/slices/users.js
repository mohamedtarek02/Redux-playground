import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (_, { getState, rejectWithValue }) => {
    const { userId } = getState().users;
    try {
      const response = await axios(
        `https://jsonplaceholder.typicode.com/todos/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userId: 1,
  showUser: true,
  userData: null,
  isUserLoading: false,
  error: null,
};

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
    setUserLoading(state, action) {
      state.isUserLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isUserLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isUserLoading = false;
        state.error = action.payload;
      });
  },
});

export const { fetchNewUser, toggle } = usersSlice.actions;
export default usersSlice.reducer;
