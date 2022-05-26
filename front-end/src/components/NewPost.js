import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { instance } from "../helpers/api";
import "./NewPost.css";

const API = process.env.REACT_APP_API_URL;
function NewPost() {
  const [post, setPost] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const postData = await instance.get(API + "/activity/" + id);
        setPost(postData.data);
      }
    };
    fetchData();
  }, [id]);

  const handleTextChange = (event) => {
    const { id, value } = event.target;
    setPost({ ...post, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    id !== undefined
      ? instance.put(API + "/activity/" + id, post).then(() => navigate("/activity/" + id))
      : instance.post(API + "/activity/", post).then(() => navigate(`/`));
  };

  return (
    <div className="container p-2 post">
      <h2>Post your favorite picture</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <div className="form-outline">
          <label className="form-label" htmlFor="name">
            {" "}
            Name :{" "}
          </label>
          <input
            className="form-control form-control-sm"
            type="text"
            id="name"
            value={post.name || ""}
            onChange={handleTextChange}
            required
          />
        </div>

        <div className="form-outline">
          <label className="form-label" htmlFor="description">
            {" "}
            Description :
          </label>
          <textarea
            className="form-control form-control-sm"
            maxLength={120}
            type="text"
            id="description"
            value={post.description || ""}
            onChange={handleTextChange}
            required
          />
        </div>

        <div className="form-outline">
          <label className="form-label" htmlFor="street_address">
            {" "}
            Street Address :{" "}
          </label>
          <input
            className="form-control form-control-sm"
            type="text"
            id="street_address"
            value={post.street_address || ""}
            onChange={handleTextChange}
            required
          />
        </div>

        <div className="form-outline">
          <label className="form-label" htmlFor="city">
            {" "}
            City :
          </label>
          <input
            className="form-control form-control-sm"
            type="text"
            id="city"
            value={post.city || ""}
            onChange={handleTextChange}
            required
          />
        </div>

        <div className="form-outline">
          <label className="form-label" htmlFor="state">
            {" "}
            State :{" "}
          </label>
          <input
            className="form-control form-control-sm"
            type="text"
            id="state"
            value={post.state || ""}
            onChange={handleTextChange}
            required
          />
        </div>

        <div className="form-outline">
          <label className="form-label" htmlFor="zip_code">
            {" "}
            Zip Code :{" "}
          </label>
          <input
            className="form-control form-control-sm"
            type="text"
            id="zip_code"
            value={post.zip_code || ""}
            onChange={handleTextChange}
            required
          />
        </div>

        <div className="form-outline">
          <label className="form-label" htmlFor="category">
            {" "}
            Category :{" "}
          </label>
          <input
            className="form-control form-control-sm"
            type="text"
            id="category"
            value={post.category || ""}
            onChange={handleTextChange}
            required
          />
        </div>

        <div className="form-outline">
          <label className="form-label" htmlFor="image">
            {" "}
            Image :{" "}
          </label>
          <input
            className="form-control form-control-sm"
            type="url"
            id="image"
            value={post.image || ""}
            onChange={handleTextChange}
            required
          />
        </div>
        <br />
        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default NewPost;
