import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function TransactionDetails() {
  const [transaction, setTransaction] = useState({});
  let { index } = useParams();
  const navigate = useNavigate();

  useEffect(
    () => {
      axios
        .get(`${API}/transactions/${index}`)
        .then((response) => setTransaction(response.data))
        .catch((error) => navigate(`/404`));
    }, [index]);

  const handleDelete = () => {
    axios
      .delete(`${API}/transactions/${index}`)
      .then((response) => navigate(`/transactions`))
      .catch((error) => console.error(error));
    /* 
      We need to send a DELETE request to our DB 
      1. Get the INDEX of our transaction
      2. send the DELETE request to our API
      3. < what do we need to do after this works ? >
    */
  };
  return (
    <article>
      <h3>
       {transaction.name}
      </h3>
      <h4>
        Date: {transaction.date}
      </h4>
      <h4>
        Amount: ${transaction.amount}
        </h4>
        <h4>
          From: {transaction.from}
        </h4>
      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/transactions`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/transactions/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default TransactionDetails;
