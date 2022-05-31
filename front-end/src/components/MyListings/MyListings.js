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
        if (response) {
          setPosts(response.data);
        }
      })

      .catch((error) => {
        console.error("catch", error);
        alert("Please log in to you account to access your listings");
        navigate("/activity/login");
      });
  }, [navigate]);

  const myPosts = posts.map((post) => {
    return (
      <div className="userListing">
        <button
          onClick={() => {
            navigate(`/activity/${post.id}/edit`);
          }}
        >
          <i class="fas fa-pencil-alt"></i>
        </button>
        <ActivityCard activity={post} />
      </div>
    );
  });

  const result = myPosts.length ? (
    myPosts
  ) : (
    <div className="message">
      <h3>You have not posted any listings</h3>
    </div>
  );

  return <div className="userContainer">{result}</div>;
}

export default MyListings;
