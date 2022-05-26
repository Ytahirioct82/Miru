import { useState, useEffect } from "react";
import { instance } from "../../helpers/api";
import ActivityCard from "../ActivityCard";
import { useNavigate } from "react-router-dom";
import "./MyListings.css";

const API = process.env.REACT_APP_API_URL;
function MyListings() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    instance
      .get(`${API}/user/listings`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.warn("catch", error));
  }, []);

  const myPosts = posts.map((post) => {
    return (
      <div className="userListing">
        <button
          onClick={() => {
            navigate(`/activity/${post.id}/edit`);
          }}
        >
          Edit listing
        </button>
        <ActivityCard activity={post} />
      </div>
    );
  });

  const result = myPosts.length ? myPosts : <h3 className="message">You have not posted any listings</h3>;

  return <div className="userContainer">{result}</div>;
}

export default MyListings;
