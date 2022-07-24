import Transactions from "../Components/Transactions";
import { useState, useEffect } from "react";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

function Index() {
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    axios.get(`${API}/transactions`)
      .then((response) => { setTransactions(response.data) })
      .catch((error) => { console.error(error) })
  },[])
  
  const balance = () => {
    let total = 0
    transactions.map((transaction) =>{
      total += Number(transaction.amount)
    })
    return total
  }
  
  return (
    <div className="Index">
      <h2>Safu Balance: ${balance()}</h2>
      <Transactions transactions={transactions}/>
    </div>
  );
}

export default Index;
