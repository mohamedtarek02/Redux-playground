import { useEffect } from "react";

import UserData from "./components/User";
import Controller from "./components/Controller";
import Loader from "./components/Loader";

import { useSelector, useDispatch } from "react-redux";

import { fetchUser } from "./store/slices/users";

// Flag to skip first render (out side function component to only run once)
let isInitialized = false;

function App() {
  const userId = useSelector((state) => state.users.userId);
  const isLoading = useSelector((state) => state.users.isUserLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    // Skip the first render
    if (!isInitialized) {
      isInitialized = true;
      return;
    }

    dispatch(fetchUser()); // could send userId as argument but getting from state inside thunk
  }, [userId, dispatch]);

  return (
    <>
      {isLoading ? <Loader /> : <UserData />}
      <Controller />
    </>
  );
}

export default App;
