import { React, useState } from "react";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import "./Navbar.css";
import { instance } from "../helpers/api";
const API = process.env.REACT_APP_API_URL;

const Navbar = (props) => {
  const [log, setLog] = useState([]);

  const loggedOut = (id) => {
    props.isLogged(id);
  };

  const logout = () => {
    instance
      .post(`${API}/user/logout`)
      .then((response) => {
        setLog(response.data.message);
        alert(response.data.message);
        loggedOut(null);
      })
      .catch((error) => console.warn("catch", error));
  };

  const userLog = props.isLoggedIn ? (
    <Link to="/activity/login" className="nav-link">
      <button onClick={logout} type="button" style={{ color: "white" }} className="btn btn-outline-secondary">
        Logout
      </button>
    </Link>
  ) : (
    <Link to="/activity/login" className="nav-link">
      <button type="button" style={{ color: "white" }} className="btn btn-outline-secondary">
        Login
      </button>
    </Link>
  );
  return (
    <nav className="navbar navbar-expand-lg  navbar-dark">
      <div className="container">
        <Link to="/" className="navbar-brand w-25">
          <img className="img-fluid w-25" src={require("../asset/miruUpdated.png")} alt="Miru" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto">
            <li>
              <Link to="/activity/new" className="nav-link">
                <button type="button" style={{ color: "white" }} className="btn btn-outline-secondary">
                  <BsPlusLg />
                  &nbsp;&nbsp; Post
                </button>
              </Link>
            </li>

            <li>{userLog}</li>
            <li>
              <Link to="/activity/listings" className="nav-link">
                <button type="button" style={{ color: "white" }} className="btn btn-outline-secondary">
                  My listing
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
