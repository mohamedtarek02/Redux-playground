import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ItemDetails from "./ItemDetails";

export default function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const filterInputRef = useRef();
  const filterPickedType = useRef();
  const originalData = useRef([]);

  useEffect(() => {
    axios
      .get(
        "https://api.mockaroo.com/api/generate.json?key=84ae64e0&schema=transactions&count=100"
      )
      .then((response) => {
        setTransactions(response.data);
        originalData.current = response.data;
      });
  }, []);

  function filterHandler() {
    const filterText = filterInputRef.current.value?.toLowerCase();
    const filterPicked = filterPickedType.current.value?.toLowerCase();

    console.log({ filterText, filterPicked });

    if ((filterText === "" || !filterText) && filterPicked === "all") {
      setTransactions(originalData.current);
    } else if (filterPicked === "income" && filterText === "") {
      setTransactions((prevTransactions) =>
        prevTransactions.filter(
          (transaction) => Number(transaction.amount) >= 0
        )
      );
    } else if (filterPicked === "income" && filterText !== "") {
      setTransactions((prevTransactions) =>
        prevTransactions.filter(
          (transaction) =>
            Number(transaction.amount) >= 0 &&
            (transaction.vendor.toLowerCase().includes(filterText) ||
              transaction.description.toLowerCase().includes(filterText))
        )
      );
    } else if (filterPicked === "expenses") {
      setTransactions((prevTransactions) =>
        prevTransactions.filter(
          (transaction) =>
            Number(transaction.amount) < 0 &&
            (transaction.vendor.toLowerCase().includes(filterText) ||
              transaction.description.toLowerCase().includes(filterText))
        )
      );
    }
  }

  return (
    <>
      <h2>Transactions List</h2>
      {/* Filtering transacions */}
      <input
        type="text"
        placeholder="Search transactions..."
        onChange={filterHandler}
        ref={filterInputRef}
      />
      <select onChange={filterHandler} ref={filterPickedType}>
        <option value="all">All Transactions</option>
        <option value="income">Income</option>
        <option value="expenses">Expenses</option>
      </select>
      {/* Transactions list */}
      <ul>
        {transactions.map((item) => (
          <ItemDetails key={item.id} transaction={item} />
        ))}
      </ul>
    </>
  );
}
