import React from 'react'
import { Link } from 'react-router-dom'
import "./AllActivities.css";
const ActivityCard = ({activity}) => {
    const {
id,
image,
name
    } = activity
  return (
      <div className="Post">
        <Link to={`/Activity/${id}`}>
          <img
            className="post-picture"
            src={image}
            alt={name}
            width="300"
            height="300"
          ></img>
          <h3>{name}</h3>
        </Link>
      </div>
  )
}

export default ActivityCard