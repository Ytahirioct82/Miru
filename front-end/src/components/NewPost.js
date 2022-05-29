import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { instance } from "../helpers/api";
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

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileSelection = async (event) => {
    let file = event.target.files[0];
    let result = await getBase64(file);
    console.log(result);
    setPost({ ...post, image: result });
  };

  const cancelPost = () => {
    if (id) {
      navigate("/activity/" + id);
    } else {
      navigate("/");
    }
  };

  const imageComponent = () => {
    if (!id) {
      return (
        <div className="form-outline">
          <label className="form-label" htmlFor="image">
            {" "}
            Image :{" "}
          </label>
          <input
            className="form-control form-control-sm"
            type="file"
            id="image"
            onChange={handleFileSelection}
            required
          />
        </div>
      );
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
          {post.description ? <p style={{ color: "red" }}>{`${charRemaining} / ${120} characters remaining`}</p> : null}
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

        {/* needs to be abbreviated */}
        {/* let users know */}

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

        {/* needs to be abbreviated */}
        {/* let users know */}

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

        {/* should be drop down */}
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

        {/* paste the image, find the base64 of the image */}
        {/* disable the submit button till the front end is complete */}
        {/* save the activity against the  */}
        {/* bcrypt, salt */}
        {/* 90/90 rule */}

        <div className="form-outline">
          <label className="form-label" htmlFor="image">
            {" "}
            Image :{" "}
          </label>
          <input
            className="form-control form-control-sm"
            type="file"
            id="image"
            onChange={handleFileSelection}
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
              className="form-control form-control-sm"
              type="file"
              id="image"
              onChange={handleFileSelection}
              required
            />
          </div>
        )}

        <br />
        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
        <button type="button" className="btn btn-secondary" onClick={cancelPost}>
          Cancel
        </button>
      </form>
    </div>
  );
}
export default NewPost;
