import axios from "axios";
import React from "react";
// import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

//when you click that button it will take the info of post and save it to the table in the backend
//

export default function SavedPost({ savedPost }) {
  const [saved, setSaved] = useState(savedPost);
  useEffect(() => {
    setSaved(savedPost);
  }, []);
  const API = process.env.REACT_APP_API_URL;
  //   const navigate = useNavigate();
  //   const { id } = useParams();

  //   const handleClick = () => {
  //     id !== undefined &&
  //       axios.get(API + "/activiy/" + id).then(() => navigate("/saved"));
  //   };

  const handleClick = () => {
    // onSavedPost(saved);
  };

  return (
    <div>
      <form onClick={handleClick}>
        <button>♡</button>
      </form>
    </div>
  );
}
