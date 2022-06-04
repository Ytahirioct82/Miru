import { React, useState, useEffect } from "react";
import { instance } from "../helpers/api";
import ActivityCard from "./ActivityCard";
import { useNavigate } from "react-router-dom";

const Content = (props) => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    instance
      .get(`/user/login`)
      .then((response) => {
        if (response) {
          load();
        }
      })
      .catch((error) => {
        console.error("catch", error);
      });
  }, []);

  const load = () => {
    instance.get(`/activity/favorites`).then((response) => {
      setFavorites(response.data);
    });
  };

  const handleFav = (event) => {
    if (event.target.name === "notFav") {
      instance
        .post(`/activity/${event.target.id}/favorites`)
        .then(() => {
          load();
        })
        .catch((error) => {
          console.warn(error);
        });
    } else {
      instance
        .delete(`/activity/${event.target.id}/favorites`)
        .then(() => {
          load();
        })
        .catch((error) => {
          console.warn(error);
        });
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
