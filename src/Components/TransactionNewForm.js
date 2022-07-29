import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function TransactionNewForm() {
  const [transaction, setTransaction] = useState({
    name: "",
    date: "",
    amount: "",
    from: "",
    category: ""
  });
  const navigate = useNavigate();

  const addTransaction = () => {
    axios
      .post(`${API}/transactions`, transaction)
      .then((response) => navigate(`/transactions`)) // happy path! only happens if above request worked
      .catch((error) => console.error(error)); // bad path! happens when our request fails!
  };
  /* We need a function to SEND our DATA to the DATABASE
    1. Get a handle on our data
    2. send a POST request to our DB
    3. < What happens after we succeed? >
  */
  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTransaction();
  };
  return (
    <div className="New">
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
          pattern="\d{4}/\d{1,2}/\d{1,2}"
          required
          value={transaction.date}
          placeholder="yyyy/mm/dd"
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
          <label htmlFor="category">Category:</label>
          <br/>
        <select onChange={handleTextChange} name="category" id="category">
          <option value="Entertainment">Entertainment</option>
          <option value="Income">Income</option>
          <option value="Investment">Investment</option>
          <option value="Food">Food</option>
          <option value="Housing">Housing</option>
          <option value="Ultilities">Utilities</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default TransactionNewForm;
