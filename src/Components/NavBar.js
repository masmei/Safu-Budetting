import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem } from "@fortawesome/free-solid-svg-icons";
export default function NavBar() {
  return (
    <nav>
       <h1>
       
        <Link to="/"><FontAwesomeIcon icon={faGem}></FontAwesomeIcon> Safu</Link>
      </h1>
      <ul>
        <Link to="/transactions">Transactions</Link>
        <Link to="/transactions/new">New Transaction</Link>
      </ul>
    </nav>
  );
}
