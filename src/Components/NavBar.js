import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <nav>
       <h1>
       
        <Link to="/"> Safu</Link>
      </h1>
      <ul>
        <Link to="/transactions">Transactions</Link>
        <Link to="/transactions/new">New Transaction</Link>
      </ul>
    </nav>
  );
}
