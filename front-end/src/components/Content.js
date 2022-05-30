import { React, useState, useEffect } from "react";
import { instance } from "../helpers/api";
import ActivityCard from "./ActivityCard";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

const Content = (props) => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.isLogged) {
      load();
    }
  }, []);

  const load = () => {
    instance
      .get(`${API}/activity/favorites`)
      .then((response) => {
        setFavorites(response.data);
        props.funcFav(response.data);
      })
      .catch((error) => console.warn("catch", error));
  };

  const handleFav = (event) => {
    if (event.target.name === "notFav") {
      instance
        .post(`${API}/activity/${event.target.id}/favorites`)
        .then(() => {
          load();
        })
        .catch((error) => {
          console.warn(error);
          alert("Please log in to you account to add favorites");
          navigate("/activity/login");
        });
    } else {
      //delete from back end
      //call load to render changes
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
