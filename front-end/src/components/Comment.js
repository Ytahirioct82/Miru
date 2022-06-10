import React from "react";
import { useState, useEffect } from "react";

export const Comment = ({ comment, edit, onEditFn, onCancelFn, onEditSubmit, onDeleteFn, userId, currentUser }) => {
  const [editedComment, setEditedComment] = useState(comment);
  useEffect(() => {
    setEditedComment(comment);
  }, [comment]);

  const handleChange = (event) => {
    setEditedComment({ ...editedComment, [event.target.id]: event.target.value });
  };

  const handleEdit = () => {
    onEditFn(comment);
  };

  const handleCancel = () => {
    onCancelFn();
  };

  const handleSubmit = () => {
    onEditSubmit(editedComment);
  };

  const handleDelete = (event) => {
    onDeleteFn(event.target.value);
  };

  const showEditButton = userId === currentUser ? <button onClick={handleEdit}>Edit</button> : null;
  const showDeleteButton =
    userId === currentUser ? (
      <button value={`${comment.id}`} onClick={handleDelete}>
        Delete
      </button>
    ) : null;

  return (
    <div className="Comment" key={comment.id}>
      {edit}
      <h6>{comment.name}</h6>
      {!edit && (
        <div className="comment-buttons">
          <p>{comment.comment}</p>
          {showEditButton}
          {showDeleteButton}

          {/* <button onClick={handleEdit}>Edit</button>
          <button value={`${comment.id}`} onClick={handleDelete}>
            Delete
          </button> */}
        </div>
      )}

      {edit && (
        <div>
          <textarea
            id="comment"
            value={editedComment.comment}
            type="textarea"
            onChange={handleChange}
            placeholder="User Name"
            required
          />

          <button onClick={handleSubmit}>Submit</button>
          <button value={`${comment.id}`} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
