import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./NewPost.css";

const API = process.env.REACT_APP_API_URL;
function NewPost() {
  const [post, setPost] = useState({});
  const [charRemaining, setCharRemaining] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const postData = await axios.get(API + "/activity/" + id);
        setPost(postData.data);
      }
    };
    fetchData();
  }, [id]);

  const handleTextChange = (event) => {
    const { id, value } = event.target;
    setPost({ ...post, [id]: value });
  };

  const cancelPost = () => {
    if (id) {
      navigate("/activity/" + id);
    } else {
      navigate("/");
    }
  };

  (() => {
    document.addEventListener("keyup", (event) => {
      if (event.target.matches(".count-chars")) {
        const value = event.target.value;
        const valueLength = value.length;

        const maxChars = parseInt(event.target.getAttribute("data-max-chars"));
        let remainingChars = maxChars - valueLength;

        if (valueLength > maxChars) {
          event.target.value = value.substr(0, maxChars);
          return;
        }
        setCharRemaining(remainingChars);
      }
    });
  })();

  const getBase64Update = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_) => resolve(reader.result);
      reader.onerror = (e) => reject(e);
    });
  };

  const onchange = (event) => {
    let files = Array.from(event.target.files);
    files = files.map(async (file) => ({
      content: await getBase64Update(file),
      fileName: file.name,
      contentType: file.type,
      length: file.size,
    }));
    Promise.all(files).then((result) => setPost({ ...post, images: result }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    id !== undefined
      ? axios
          .put(API + "/activity/" + id, post)
          .then(() => navigate("/activity/" + id))
      : axios
          .all([axios.post(API + "/activity/", post)])
          .then(() => navigate(`/`));
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
            className="form-control form-control-sm count-chars"
            maxLength={120}
            data-max-chars={120}
            type="text"
            id="description"
            value={post.description || ""}
            onChange={handleTextChange}
            required
          />
          {post.description ? (
            <p
              style={{ color: "red" }}
            >{`${charRemaining} / ${120} characters remaining`}</p>
          ) : null}
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

        {!id && (
          <div className="form-outline">
            <label className="form-label" htmlFor="image">
              {" "}
              Image :{" "}
            </label>
            <input
              multiple
              className="form-control form-control-sm"
              type="file"
              id="image"
              onChange={onchange}
              required
            />
          </div>
        )}

        <br />
        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={cancelPost}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
export default NewPost;
