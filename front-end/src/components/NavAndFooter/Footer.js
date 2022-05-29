import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pb-4">
      <div className="container text-center text-md-left">
        <div className="row text-center text-mm-left">
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase  font-weight-bold text-warning">
              Miru
            </h5>
            <div>Message</div>
          </div>
          {/* mx-auto: horizontally centering fixed-width block level content */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase font-weight-bold text-warning">
              Services
            </h5>
            <div>
              <a
                href="https://www.centralparknyc.org/"
                className="text-white"
                style={{ textDecoration: "none" }}
                target="framename"
              >
                {" "}
                Parks{" "}
              </a>
            </div>
            <div>
              <a
                href="https://www.bigbustours.com/"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                {" "}
                SightSeeing{" "}
              </a>
            </div>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <div>
              <h5 className="text-uppercase font-weight-bold text-warning">
                Useful links
              </h5>
              <a
                href="/"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                {" "}
                Miru{" "}
              </a>
            </div>
            <div>
              <a
                href="/"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                {" "}
                Miru{" "}
              </a>
            </div>
          </div>
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase font-weight-bold text-warning">
              Contact
            </h5>
            <div>
              <i className="fas fa-home mr-3"> </i> New York, NY 11101,US
            </div>
            <div>
              <i className="fas fa-envelope mr-3"> </i> miru@gmail.com
            </div>
            <div>
              <i className="fas fa-phone mr-3"></i> +1 000-000-0000
            </div>
          </div>
          <hr className="md-4" />

          <div className="row align-items-center">
            <div className="col-md-7 col-lg-8">
              <div>
                Copyright©2022 All rights reserved by:{" "}
                <a href="/" style={{ textDecoration: "none" }}>
                  <strong className="text-warning">Miru</strong>
                </a>
              </div>
            </div>
            <div className="col-md-5col-lg-4">
              <div className="text-center text-md-right">
                <ul className="list-unstyled list-inline">
                  <li className="list-inline-item">
                    <a
                      href="/"
                      className="btn-floating btn-sm text-white"
                      style={{ fontSize: "23px" }}
                    >
                      <i className="fab fa-github fa-2x"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="/"
                      className="btn-floating btn-sm text-white"
                      style={{ fontSize: "23px" }}
                    >
                      <i className="fab fa-twitter fa-2x"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="/"
                      className="btn-floating btn-sm text-white"
                      style={{ fontSize: "23px" }}
                    >
                      <i className="fab fa-facebook fa-2x"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="/"
                      className="btn-floating btn-sm text-white"
                      style={{ fontSize: "23px" }}
                    >
                      <i className="fab fa-instagram fa-2x"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
