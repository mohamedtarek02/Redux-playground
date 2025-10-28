export default function TransactionCard(prop) {
  const { transaction } = prop;

  return (
    <li>
      <div>
        {transaction.date} - {transaction.description} - ${transaction.amount}{" "}
      </div>
      <p> {transaction.currency}</p>
    </li>
  );
}
