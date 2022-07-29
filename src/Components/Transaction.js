import { Link } from "react-router-dom";

function Transaction({ transaction, index }) {
  return (
    <tr>
      <td>
        {transaction.date}
      </td>
      <td>
      <Link to={`/transactions/${index}`}>{transaction.name}</Link>
      </td>
      <td>
        <p>{transaction.category}</p>
      </td>
      <td>
        <p>${transaction.amount}</p>
      </td>
    </tr>
  );
}

export default Transaction;
