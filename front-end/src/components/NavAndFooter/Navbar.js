import React from "react";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg  navbar-dark">
      <div className="container">
        <Link to="/" className="navbar-brand w-25">
          <img
            className="img-fluid w-25"
            // src={require(".../assets/miruUpdated.jpg")}
            alt="Miru"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto">
            <li>
              <Link to="/activity/new" className="nav-link">
                <button
                  type="button"
                  style={{ color: "white" }}
                  className="btn btn-outline-secondary"
                >
                  <BsPlusLg />
                  &nbsp;&nbsp; Post
                </button>
              </Link>
            </li>

            <li>
              <Link to="/activity/login" className="nav-link">
                <button
                  type="button"
                  style={{ color: "white" }}
                  className="btn btn-outline-secondary"
                >
                  Login
                </button>
              </Link>
            </li>
            <li>
              {/* <Link to="/" className="nav-link">
                <button type="button" className="btn btn-outline-primary">
                  Register
                </button>
              </Link> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
