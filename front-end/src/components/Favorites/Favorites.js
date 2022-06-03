import { useState, useEffect, React } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../helpers/api";
import ActivityCard from "../ActivityCard";
const API = process.env.REACT_APP_API_URL;

function Favorites(props) {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (props.isLoggedIn) {
      setFavorites(props.fav);
    } else {
      alert("Please log in to you account to access your favorites");
      navigate("/activity/login");
    }
  }, []);

  let newFav = [];

  const handleFav = (event) => {
    instance
      .delete(`${API}/activity/${event.target.id}/favorites`)
      .then((response) => {
        setFavorites(
          favorites.filter((fav) => {
            return fav.activity_id != response.data.activity_id;
          })
        );
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const result = favorites.map((fav) => {
    return (
      <div key={fav.id}>
        <div className="deleteFav">
          <button class="btn" onClick={handleFav}>
            <i class="fa fa-trash" id={fav.activity_id}>
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
