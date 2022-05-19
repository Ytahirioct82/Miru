import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Comment } from "./Comment";

function Comments() {
  const { id } = useParams();

  const API = process.env.REACT_APP_API_URL;

  const [comments, setComments] = useState([]);
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [comment, setComment] = useState({
    // activity_id: `${id}`,
    name: "",
    comment: "",
  });

  // fetching all comments
  useEffect(() => {
    handleLoad();
  }, []);

  const handleLoad = () => {
    axios
      .get(`${API}/activity/${id}/comments`)
      .then((response) => {
        console.log(response.data);
        setComments(response.data);
      })

      .catch((error) => console.warn(error));
  };

  //saves input text typed by the user to the state
  const handleTextChange = (event) => {
    setComment({ ...comment, [event.target.id]: event.target.value });
  };

  // submits new comment to backend
  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API}/activity/${id}/comments`, comment)
      .then((response) => {
        handleLoad();
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
      if (response.data.id) {
        setEditedCommentId(null);
        handleLoad();
      } else {
        alert("must include input");
      }
    });
  };

  // delete comment
  const handleDelete = (idOfDeleted) => {
    axios
      .delete(`${API}/activity/${id}/comments/${idOfDeleted}`)
      .then((response) => {
        handleLoad();
      })

      .catch((error) => console.warn(error));
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
        onDeleteFn={handleDelete}
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
