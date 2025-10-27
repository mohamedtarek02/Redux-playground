import { useEffect, useState } from "react";
import axios from "axios";

import UserData from "./components/User";
import Controller from "./components/Controller";
import Loader from "./components/Loader";

import { useSelector, useDispatch } from "react-redux";
import { usersActions } from "./store/slices/users";

// Flag to skip first render (out side function component to only run once)
let isInitialized = false;

function App() {
  const userId = useSelector((state) => state.users.userId);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Skip the first render
    if (!isInitialized) {
      isInitialized = true;
      return;
    }

    setIsLoading(true);
    // Fetch user data and error handling
    const fethUserHandler = async () => {
      const respone = await axios(
        `https://jsonplaceholder.typicode.com/todos/${userId}`
      );
      const userData = respone.data;
      dispatch(usersActions.addUser(userData));
    };

    fethUserHandler()
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [userId, dispatch]); // React handes reserving of dispatch value to avoid triggering unless userId changing.

  return (
    <>
      {isLoading ? <Loader /> : <UserData />}
      <Controller />
    </>
  );
}

export default App;
