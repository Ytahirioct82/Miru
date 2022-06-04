import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../helpers/api";
import { Comment } from "./Comment";
import "./Comments.css";

function Comments({ setImages }) {
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [comment, setComment] = useState({
    comment: "",
  });

  useEffect(() => {
    handleLoad();
  }, []);

  const handleLoad = () => {
    instance
      .get(`/activity/${id}/comments`)
      .then((response) => {
        setComments(response.data);
      })

      .catch((error) => console.warn(error));
  };

  const handleTextChange = (event) => {
    setComment({ ...comment, [event.target.id]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    instance
      .post(`/activity/${id}/comments`, comment)
      .then((response) => {
        setImages(comment.images);

        handleLoad();
      })
      .catch((error) => console.warn(error));
    setComment({
      comment: "",
    });
  };

  const handleEditSubmit = (comment) => {
    instance.put(`/activity/${id}/comments/${editedCommentId}`, comment).then((response) => {
      if (response.data.id) {
        setEditedCommentId(null);
        handleLoad();
      } else {
        alert("must include input");
      }
    });
  };

  const handleDelete = (idOfDeleted) => {
    instance
      .delete(`/activity/${id}/comments/${idOfDeleted}`)
      .then((response) => {
        handleLoad();
      })

      .catch((error) => console.warn(error));
  };

  const handleCommentEdit = (comment) => {
    setEditedCommentId(comment.id);
  };

  const handleCancelCommentEdit = (comment) => {
    setEditedCommentId(null);
  };

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
    Promise.all(files).then((result) => {
      setComment({ ...comment, images: result });
    });
  };

  const allComments = comments.map((comment, i) => {
    return (
      <Comment
        key={comment.id}
        comment={comment}
        edit={editedCommentId === comment.id}
        onEditFn={handleCommentEdit}
        onCancelFn={handleCancelCommentEdit}
        onEditSubmit={handleEditSubmit}
        onDeleteFn={handleDelete}
        userId={comment.user_id}
        currentUser={comment.currentUser}
      />
    );
  });

  return (
    <div className="CommentSection">
      <div className="CommentForm">
        <form onSubmit={onSubmit}>
          <label htmlFor="Comment">Comment:</label>
          <input
            id="comment"
            value={comment.comment}
            type="textarea"
            onChange={handleTextChange}
            placeholder="Comment..."
            required
          />

          <div className="form-outline">
            <label className="form-label" htmlFor="image">
              {" "}
              Image:
            </label>
            <input multiple type="file" id="image" onChange={onchange} />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
      {allComments}
    </div>
  );
}

export default Comments;
