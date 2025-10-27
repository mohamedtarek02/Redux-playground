import { useDispatch } from "react-redux";
import {counterActions} from "../store/slices/counter";



const ProductItem = (props) => {
  
  const dispatch = useDispatch();

  function incrementHandler() {
    dispatch(counterActions.customIncrement(5));
  }
  function toggleHandler() {
    dispatch(counterActions.toggle());
  }

  
  return (
    <div>
      <button onClick={incrementHandler}>Custom Increment</button>
      <button onClick={toggleHandler}>Toggle Counter </button>
    </div>
  );
};

export default ProductItem;
