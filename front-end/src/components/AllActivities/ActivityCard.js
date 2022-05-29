import React from "react";
import { Link } from "react-router-dom";
import "./AllActivities.css";
import axios from "axios";
import { useState, useEffect } from "react";

const ActivityCard = ({ activity }) => {
  const { id, name } = activity;

  const API = process.env.REACT_APP_API_URL;
  const [image, setImage] = useState({});

  useEffect(() => {
    axios
      .get(`${API}/activity/${activity.id}/images/1`)
      .then((response) => {
        setImage(response.data[0]);
      })
      .catch((error) => console.warn("catch".error));
  }, [id, API, activity.id]);

  return (
    <div className="Post">
      <Link to={`/Activity/${id}`}>
        <img
          className="post-picture"
          src={image.content}
          alt={name}
          width="300"
          height="300"
        ></img>
        <h3>{name}</h3>
      </Link>
    </div>
  );
};

export default ActivityCard;
