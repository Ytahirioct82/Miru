import React from "react";
import "./SearchActivity.css";
import "./AllActivities.css";

const SearchActivity = ({ search, setSearch }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <li className="nav-item list-unstyled">
        <div className="input-group">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search miru by city"
            aria-label="Search"
            aria-describedby="search-addon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
       
        </div>{" "}
        <div className="form-helper pt-2">
          <span className="font-weight-bold"> Example </span>
          <a href="#!" className="text-black-50">
            NY,
          </a>
          &nbsp;&nbsp;
          <a href="#!" className="text-black-50">
            NJ,
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
