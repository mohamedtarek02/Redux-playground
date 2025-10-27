import { useDispatch } from "react-redux";
import { usersActions } from "../store/slices/users";

const ProductItem = (props) => {
  const dispatch = useDispatch();

  function nextClientHandler() {
    dispatch(usersActions.fetchNewUser(1));
  }
  function toggleClientHandler() {
    dispatch(usersActions.toggle());
  }

  return (
    <div className="flex gap-6 justify-center">
      <button onClick={nextClientHandler}>Fetch Next User</button>
      <button onClick={toggleClientHandler}>Toggle User Info </button>
    </div>
  );
};

export default ProductItem;
