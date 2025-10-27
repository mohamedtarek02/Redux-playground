import { useSelector } from "react-redux";

const mainClass =
  "mt-20 mb-20 mx-auto shadow-md w-[40rem] rounded-lg p-4 text-center bg-[#f4f0fa]";

const Counter = () => {
  const show = useSelector((state) => state.users.showUser);
  const userData = useSelector((state) => state.users.userData);

  if (!show) {
    return (
      <main className={mainClass}>
        <h1>User Info hidden</h1>
      </main>
    );
  }

  if (!userData) {
    return (
      <main className={mainClass}>
        <h1>No User Fetched yet...</h1>
      </main>
    );
  }

  return (
    <main class={mainClass}>
      <h1>User Info</h1>
      <p>ID: {userData.id}</p>
      <p>title: {userData.title} </p>
    </main>
  );
};

export default Counter;
