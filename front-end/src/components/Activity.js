import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Route, Routes } from "react-router-dom";
import { instance } from "../helpers/api";
import "./Activity.css";
import Comments from "./Comments";

function Activity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  const [post, setPost] = useState([]);
  useEffect(() => {
    instance
      .get(`${API}/activity/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => console.warn("catch", error));
  }, []);

  return (
    <div>
      <section className="DetailPost">
        <div className="post">
          <h3>{post.name}</h3>
          <img className="post-picture" src={post.image} alt={post.name} width="300" height="300"></img>
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
