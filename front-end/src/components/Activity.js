import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../helpers/api";
import "./Activity.css";
import Comments from "./Comments";
import ActivityImages from "./ActivityImages";

function Activity() {
  const { id } = useParams();
  const [newImages, setImages] = useState([]);
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
          <div className="Images">
            <ActivityImages activityId={id} newImages={newImages} />
          </div>
          <p>{post.description}</p>
        </div>
        <div className="Comments aside">
          <h3>Comment Section</h3>
          <Comments setImages={setImages} />
        </div>
      </section>
    </div>
  );
}

export default Activity;
