import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Mir
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto">
            <li>
              <Link to="/activity/new" className="nav-link">
                <button type="button" className="btn btn-outline-primary">
                  <BsPlusLg />
                </button>
              </Link>
            </li>
            {/* <li>
                            <Link to="/" className="nav-link">
                                <button type="button" className="btn btn-outline-primary">
                                    Sign up
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="nav-link">
                                <button type="button" className="btn btn-outline-primary">
                                    Sign in
                                </button>
                            </Link>
                        </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
