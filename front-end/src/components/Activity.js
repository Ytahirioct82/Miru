import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../helpers/api";
import "./Activity.css";
import Comments from "./Comments";
import ActivityImages from "./ActivityImages";

function Activity() {
  const { id } = useParams();

  const API = process.env.REACT_APP_API_URL;

  const [post, setPost] = useState([]);
  useEffect(() => {
    instance
      .get(`${API}/activity/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => console.warn("catch", error));
  }, [API, id]);

  return (
    <div>
      <section className="DetailPost">
        <div className="post">
          <h3>{post.name}</h3>
          {/* <img className="post-picture" src={post.image} alt={post.name} width="300" height="300"></img> */}
          <ActivityImages activityId={id} />
          <p>{post.description}</p>
        </div>
        <div className="modify"></div>
        <h3>Comment Section</h3>
      </section>
      <Comments />
    </div>
  );
}

export default Activity;
