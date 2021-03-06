import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import "./Navbar.css";
import { instance } from "../helpers/api";

const Navbar = (props) => {
  const [log, setLog] = useState(null);
  useEffect(() => {
    instance
      .get(`/user/login`)
      .then((response) => {
        if (response) {
          setLog(response.data);
        }
      })
      .catch((error) => {
        console.error("catch", error);
      });
  }, [props.isLoggedIn]);

  const logout = () => {
    instance
      .post(`/user/logout`)
      .then((response) => {
        setLog(null);
        alert(response.data.message);
      })
      .catch((error) => console.warn("catch", error));
  };

  const userLog = log ? (
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

  let initials = null;

  if (log) {
    const fullName = log.name.split(" ");
    initials = <h5>{fullName.shift().charAt(0) + fullName.pop().charAt(0).toUpperCase()}</h5>;
  }

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
            <li>
              <Link to="/activity/favorites" className="nav-link">
                <button type="button" style={{ color: "white" }} className="btn btn-outline-secondary">
                  Favorites
                </button>
              </Link>
            </li>
          </ul>
        </div>
        {initials}
      </div>
    </nav>
  );
};

export default Navbar;
