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
    handleLoad2();
  }, [API, id]);

  const handleLoad2 = () => {
    console.log("running the 2nd");
    console.log(newImages);
    instance
      .get(`${API}/activity/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => console.warn("catch", error));
  };

  return (
    <div>
      <section className="DetailPost">
        <div className="post">
          <h3>{post.name}</h3>
          <ActivityImages activityId={id} newImages={newImages} />
          <p>{post.description}</p>
        </div>
        <div className="modify"></div>
        <h3>Comment Section</h3>
      </section>
      <Comments setImages={setImages} handleLoad2={handleLoad2} />
    </div>
  );
}

export default Activity;
