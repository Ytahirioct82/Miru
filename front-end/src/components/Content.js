import { React, useState, useEffect } from "react";
import { instance } from "../helpers/api";
import ActivityCard from "./ActivityCard";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

const Content = (props) => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFavorites(props.fav);
  }, [props.fav.length]);

  const handleFav = (event) => {
    if (event.target.name === "notFav") {
      instance
        .post(`${API}/activity/${event.target.id}/favorites`)
        .then(() => navigate("/activity/favorites"))
        .catch((error) => console.warn(error));
      //send a delete request to the favorites table passing the fav id and userid
    } else {
      //send a post request to the favorites table passing user id to add to favorites
    }
  };

  return (
    <>
      {props.activities?.map((activity) => {
        let isfavorites = false;
        if (favorites.length > 0) {
          isfavorites = favorites.some((fav) => fav.activity_id === activity.id);
        }
        return (
          <div key={activity.id} className={isfavorites ? "fav" : "notFav"}>
            <button
              className="fa fa-heart"
              id={activity.id}
              name={isfavorites ? "fav" : "notFav"}
              onClick={handleFav}
            ></button>
            <ActivityCard activity={activity} />
          </div>
        );
      })}
    </>
  );
};

export default Content;
