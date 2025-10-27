import classes from "./Counter.module.css";
import { useSelector } from "react-redux";

const Counter = () => {
  const counter = useSelector((state) => state.counter.value);
  const show = useSelector((state) => state.counter.showCounter);

  if (!show) {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
      </main>
    );
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
    </main>
  );
};

export default Counter;
