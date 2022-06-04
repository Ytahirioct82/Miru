import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../helpers/api";
import "./Activity.css";
import Comments from "./Comments";
import ActivityImages from "./ActivityImages";

function Activity() {
  const { id } = useParams();

  const [post, setPost] = useState([]);
  const [newImages, setImages] = useState([]);
  useEffect(() => {
    instance
      .get(`/activity/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => console.warn("catch", error));
  }, [id]);

  return (
    <div>
      <section className="DetailPost">
        <div className="post">
          <h3>{post.name}</h3>

          <ActivityImages activityId={id} newImages={newImages} />
          <div className="address">
            <a
              href={`https://www.google.com/maps/place/${post.street_address} ${post.city} ${post.state} ${post.zip_code}`}
            >
              {post.street_address}, {post.city}, {post.state}, {post.zip_code}
            </a>
          </div>

          <p>{post.description}</p>
        </div>
        <div className="modify"></div>
        <h3>Comment Section</h3>
      </section>
      <Comments setImages={setImages} />
    </div>
  );
}

export default Activity;
