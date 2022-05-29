import React from "react";
import { Link } from "react-router-dom";
import "./AllActivities.css";
const ActivityCard = ({ activity }) => {
  const { id, image, name, city } = activity;
  return (
    <div className="Post">
      <Link to={`/Activity/${id}`}>
        <img className="post-picture" src={image} alt={name} width="300" height="300"></img>
        <h2>{name}</h2>
        <p>{city}</p>
      </Link>
    </div>
  );
};

export default ActivityCard;
