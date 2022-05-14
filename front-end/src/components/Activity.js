import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Activity.css";

function Activity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  console.log(id);

  const [post, setPost] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/activity/${id}`)
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      })
      .catch((error) => console.warn("catch", error));
  }, []);

  const HandleDelete = () => {
    axios.delete(`${API}/activity/${id}`).then(() => {
      navigate("/");
    });
  };

  return (
    <section className="DetailPost">
      <div className="post">
        <h3>{post.name}</h3>
        <img className="post-picture" src={post.image} alt={post.name} width="300" height="300"></img>
        <p>{post.description}</p>
      </div>
      <div className="modify">
        <button onClick={HandleDelete}>Delete</button>
        <button
          onClick={() => {
            navigate(`/activity/edit/${id}`);
          }}
        >
          Edit
        </button>
      </div>
    </section>
  );
}

export default Activity;
