import { useState, useEffect, React } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../helpers/api";
import ActivityCard from "../ActivityCard";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    instance
      .get(`/activity/favorites`)
      .then((response) => {
        setFavorites(response.data);
      })
      .catch((error) => console.warn("catch", error));
  };

  const handleFav = (event) => {
    instance
      .delete(`/activity/${event.target.id}/favorites`)
      .then((response) => {
        loadData();
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const result = favorites.map((fav) => {
    return (
      <div key={fav.id}>
        <div className="deleteFav">
          <button className="btn" onClick={handleFav}>
            <i className="fa fa-trash" id={fav.activity_id}>
              {" "}
              Trash
            </i>
          </button>
        </div>
        <ActivityCard activity={fav} />
      </div>
    );
  });

  return <div className="AllPosts">{result}</div>;
}
export default Favorites;
