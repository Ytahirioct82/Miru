import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Comments() {
  const { id } = useParams();
  const API = process.env.REACT_APP_API_URL;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/activity/${id}/comments`)
      .then((response) => setComments(response.data))
      .catch((error) => console.warn(error));
  });

  const allComments = comments.map((eachComment) => {
    return (
      <div>
        <div className="Comments">
          <b>{eachComment.name}</b>
          <p>{eachComment.comment}</p>
        </div>
      </div>
    );
  });

  return <div className="CommentSection">{allComments}</div>;
}

export default Comments;
