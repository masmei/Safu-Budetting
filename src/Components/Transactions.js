import { useState, useEffect } from "react";
import Transaction from "./Transaction";
import Modal from "./Modal";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [category, setCategories] = useState("all");
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    if (category === "all") {
      axios
        .get(`${API}/transactions`)
        .then((response) => {
          setTransactions(response.data);
          setLoadingError(false);
        })
        .catch((error) => {
          console.error(error);
          setLoadingError(true);
        });
    } else {
      axios
        .get(`${API}/transactions/sort?category=${category}`)
        .then((response) => {
          setTransactions(response.data);
          console.log(transactions);
          setLoadingError(false);
        })
        .catch((error) => {
          console.error(error);
          setLoadingError(true);
        });
    }
  }, [category]);

  const balance = () => {
    let total = 0;
    transactions.map((transaction) => {
      total += Number(transaction.amount);
    });
    return total;
  };

  const sortDates = (event) => {
    event.preventDefault();
    if (event.target.value === "oldest") {
      transactions.sort((a, b) => {
        return new Date(a.date).valueOf() - new Date(b.date).valueOf();
      });
      setTransactions([...transactions]);
    }
    if (event.target.value === "newest") {
      transactions.sort((a, b) => {
        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
      });
      setTransactions([...transactions]);
    }
    console.log(transactions);
  };

  const sortCategories = (event) => {
    setCategories(event.target.value);
  };

  return (
    <div className="showPage">
      <section className="balance">
        <h2>Safu Balance: ${balance()}</h2>
      </section>
      <aside className="sort">
        <h4>Sort Transactions</h4>
        <label htmlFor="dates">Dates:</label>
        <select onChange={sortDates} name="dates" id="dates">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
        <br></br>
        <label htmlFor="categories">Catgegories:</label>
        <select onChange={sortCategories} name="categories" id="categories">
          <option value="all">All</option>
          <option value="entertainment">Entertainment</option>
          <option value="income">Income</option>
          <option value="investment">Investment</option>
          <option value="food">Food</option>
          <option value="housing">Housing</option>
          <option value="Utilities">Utilities</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
      </aside>
      <div className="transactions">
        <section>
          {loadingError ? (
            <Modal closeModal={setLoadingError} />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Transaction</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => {
                  return (
                    <Transaction
                      key={index}
                      transaction={transaction}
                      index={index}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}

export default Transactions;
