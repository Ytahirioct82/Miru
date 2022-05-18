import React from 'react'
import { Link } from 'react-router-dom'
const ActivityCard = ({activity}) => {
    const {
category,
city,
description,
id,
image,
name,
state,
street_address,
zip_code
    } = activity
  return (
    <div> <Link to={`/Activity/${id}`}>
             <img
              className="post-picture"
              src={image}
              alt={name}
              width="300"
              height="300"
            ></img>
            <h3>{name}</h3>
          </Link></div>
  )
}

export default ActivityCard