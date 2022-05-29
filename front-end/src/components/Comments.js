import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../helpers/api";
import { Comment } from "./Comment";

function Comments() {
  const { id } = useParams();

  const API = process.env.REACT_APP_API_URL;

  const [comments, setComments] = useState([]);
  const [editedCommentId, setEditedCommentId] = useState(null);
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
    instance
      .get(`${API}/activity/${id}/comments`)
      .then((response) => {
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
    instance
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
    instance.put(`${API}/activity/${id}/comments/${editedCommentId}`, comment).then((response) => {
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
    instance
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
        key={comment.id}
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
            value={comment.context}
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
