import React from "react";
import "./SearchActivity.css";

const SearchActivity = ({ search, setSearch }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <li className="nav-item">
        <div className="input-group">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search miru"
            aria-label="Search"
            aria-describedby="search-addon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            style={{ color: "white" }}
            className="btn btn-outline-secondary"
          >
            search
          </button>
        </div>{" "}
        <div className="form-helper pt-2">
          <span className="font-weight-bold"> Suggested: </span>
          <a href="#!" className="text-black-50">
            parks,
          </a>
          &nbsp;&nbsp;
          <a href="#!" className="text-black-50">
            outdoors,
          </a>
          &nbsp;&nbsp;
          <a href="#!" className="text-black-50">
            more
          </a>
        </div>
      </li>
    </form>
  );
};

export default SearchActivity;
