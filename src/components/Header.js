import "../index.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <div className="flex justify-end bg-blue-500 shadow-xl">
        <ul className="flex p-4 m-5 text-white">
          <li className="px-4 font-bold text-lg">
            <Link to="/home">Home</Link>{" "}
          </li>
          <li className="px-4 font-bold text-lg">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="px-4 font-bold text-lg">
            <Link to="/contact"> Contact</Link>
          </li>
          <li className="px-4 font-bold text-lg">
            <Link to="/track">Track</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
