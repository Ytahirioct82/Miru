import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Comments() {
  const { id } = useParams();
  const API = process.env.REACT_APP_API_URL;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({
    activity_id: `${id}`,
    name: "",
    comment: "",
  });
  const [editingState, setEditingState] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/activity/${id}/comments`)
      .then((response) => setComments(response.data))
      .catch((error) => console.warn(error));
  });

  const handleTextChange = (event) => {
    setComment({ ...comment, [event.target.id]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API}/activity/${id}/comments`, comment)
      .then((response) => setComments([...comments, response.data]))
      .catch((error) => console.warn(error));
  };

  const handleDelete = (event) => {
    axios
      .delete(`${API}/activity/${id}/comments/${event.target.value}`)
      .catch((error) => console.log(error));
  };

  //when the user clicks edit, the comment they want to edit
  //is no longer rendered, but a form renders in its place
  //conditional rendering
  //when they submit then the user sees the updated post
  const handleEdit = () => {
    setEditingState(true);
  };

  const allComments = comments.map((eachComment) => {
    return (
      <div>
        <div className="Comments" key={eachComment.id}>
          <b>{eachComment.name}</b>
          <p>{eachComment.comment}</p>
          <button onClick={handleEdit}>Edit </button>
          <button value={eachComment.id} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    );
  });

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
            placeholder="User Name"
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
