import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function TransactionEditForm() {
  let { index } = useParams();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState({
    name: "",
    date: "",
    amount: "",
    from: "",
  });

  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then((response) => setTransaction(response.data))
      .catch((error) => console.error(error));
  }, []);

  const updateTransaction = () => {
    axios
      .put(`${API}/transactions/${index}`, transaction)
      .then((response) => {
        setTransaction(response.data);
        navigate(`/transactions/${index}`);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateTransaction();
  };
  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={transaction.name}
          type="text"
          onChange={handleTextChange}
          placeholder="name of transaction"
          required
        />
        <label htmlFor="date">Date:</label>
        <input
          id="date"
          type="text"
          pattern="\d{1,2}/\d{1,2}/\d{4}"
          required
          value={transaction.date}
          placeholder="mm/dd/yyyy"
          onChange={handleTextChange}
        />
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="number"
          name="amount"
          value={transaction.amount}
          placeholder="$$$"
          onChange={handleTextChange}
        />
        <label htmlFor="from">From:</label>
        <input
          id="from"
          type="text"
          name="from"
          value={transaction.from}
          placeholder="where is this from?"
          onChange={handleTextChange}
        />
        <br />
        <input type="submit" />
      </form>
      <Link to={`/transactions/${index}`}>
        <button>Back</button>
      </Link>
    </div>
  );
}

export default TransactionEditForm;
