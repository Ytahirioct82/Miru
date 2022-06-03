import { useState, useEffect, React } from "react";
import { useNavigate } from "react-router-dom";
import ActivityCard from "../ActivityCard";

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
