import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import UserData from "./components/User";
import Controller from "./components/Controller";
import Loader from "./components/Loader";

import { useSelector, useDispatch } from "react-redux";
import { usersActions } from "./store/slices/users";

function App() {
  const userId = useSelector((state) => state.users.userId);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const respone = await axios(
      `https://jsonplaceholder.typicode.com/todos/${userId}`
    );
    const userData = respone.data;
    dispatch(usersActions.addUser(userData));

    return userData;
  };

  const { isLoading } = useQuery({
    queryKey: ["userData", userId],
    queryFn: fetchUser,
    enabled: !!userId,
    onError: (error) => {
      console.log("Error fetching user:", error);
    },
  });

  return (
    <>
      {isLoading ? <Loader /> : <UserData />}
      <Controller />
    </>
  );
}

export default App;
