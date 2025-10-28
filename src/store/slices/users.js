import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userId: null,
  showUser: true,
  userData: null,
  isUserLoading: false,
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
});

export const fetchUser = () => {
  return async (dispatch, getState) => {
    const { userId } = getState().users;
    dispatch(usersActions.setUserLoading(true));

    // Async function to fetch user data
    const fetchData = async () => {
      const response = await axios(
        `https://jsonplaceholder.typicode.com/todos/${userId}`
      );

      const userData = response.data;
      return userData;
    };

    // Trgigger the fetch wait until finished then dispatch action
    try {
      const userData = await fetchData();
      dispatch(usersActions.addUser(userData));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(usersActions.setUserLoading(false));
    }
  };
};

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;
