import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Comment } from "./Comment";

function Comments() {
  const { id } = useParams();
  const { navigate } = useNavigate();

  const API = process.env.REACT_APP_API_URL;

  const [comments, setComments] = useState([]);
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [comment, setComment] = useState({
    activity_id: `${id}`,
    name: "",
    comment: "",
  });

  useEffect(() => {
    axios
      .get(`${API}/activity/${id}/comments`)
      .then((response) => setComments(response.data))
      .catch((error) => console.warn(error));
  }, [editedCommentId, comments.length]);

  // submits new comment to backend
  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API}/activity/${id}/comments`, comment)

      .then((response) => {
        console.log(response.data);
        setComments([...comments, response.data]);
      })

      .catch((error) => console.warn(error));
    setComment({
      name: "",
      comment: "",
    });
  };

  // submits edited comment to backend
  const handleEditSubmit = (comment) => {
    axios.put(`${API}/activity/${id}/comments/${editedCommentId}`, comment).then((response) => {
      // console.log(response.data);
      if (response.data.id) {
        setEditedCommentId("");
      } else {
        alert("must include all inputs");
      }
    });
  };

  //saves input text typed by the user to the state
  const handleTextChange = (event) => {
    setComment({ ...comment, [event.target.id]: event.target.value });
  };

  //not working yet. need delete on back end
  const handleDelete = (event) => {
    // axios.delete(`${API}/activity/${id}/comments/${event.target.value}`).catch((error) => console.log(error));
  };

  //toggles view between comment/buttons and textarea
  const handleCommentEdit = (comment) => {
    setEditedCommentId(comment.id);
  };

  const handleCancelCommentEdit = (comment) => {
    setEditedCommentId(null);
  };

  // returns a all comments
  const allComments = comments.map((comment) => {
    return (
      <Comment
        comment={comment}
        edit={editedCommentId === comment.id}
        onEditFn={handleCommentEdit}
        onCancelFn={handleCancelCommentEdit}
        onEditSubmit={handleEditSubmit}
      />
    );
  });
  // New comment inputs
  return (
    <div className="CommentSection">
      <div className="CommentForm">
        <form onSubmit={onSubmit}>
          <label htmlFor="UserName"> Name:</label>
          <input
            id="name"
            value={comment.name}
            type="text"
            onChange={handleTextChange}
            placeholder="User Name"
            required
          />

          <label htmlFor="Comment">Comment:</label>
          <input
            id="comment"
            value={comment.comment}
            type="textarea"
            onChange={handleTextChange}
            placeholder="Comment..."
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      {allComments}
    </div>
  );
}

export default Comments;
