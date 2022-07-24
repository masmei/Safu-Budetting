import { useState, useEffect } from "react";
import Transaction from "./Transaction";
import axios from "axios";
// ^^ this is our new package for making API calls
const API = process.env.REACT_APP_API_URL;

function Transactions({transactions}) {
 
  return (
    <div className="transactions">
      <section>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              return <Transaction key={index} transaction={transaction} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Transactions;
