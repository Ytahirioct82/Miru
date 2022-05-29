import { useState, useEffect, React } from "react";
import { instance } from "../../helpers/api";
import ActivityCard from "../ActivityCard";

function Favorites(props) {
  const API = process.env.REACT_APP_API_URL;
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    instance
      .get(`${API}/activity/favorites`)
      .then((response) => {
        console.log(response.data);
        setFavorites(response.data);
      })
      .catch((error) => console.warn("catch", error));
  }, [API]);

  props.favorite(favorites);

  const result = favorites.map((fav) => {
    return (
      <div key={fav.id}>
        <ActivityCard activity={fav} />
      </div>
    );
  });

  return <div className="AllPosts">{result}</div>;
}
export default Favorites;
