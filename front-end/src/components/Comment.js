import React from "react";
import { useState, useEffect } from "react";

export const Comment = ({ comment, edit, onEditFn, onCancelFn, onEditSubmit }) => {
  const [editedComment, setEditedComment] = useState(comment);
  useEffect(() => {
    setEditedComment(comment);
  }, [comment]);

  const handleChange = (event) => {
    console.log({ ...editedComment, [event.target.id]: event.target.value });
    setEditedComment({ ...editedComment, [event.target.id]: event.target.value });
  };

  const handleEdit = () => {
    onEditFn(comment);
  };

  const handleDelete = () => {};

  const handleSubmit = () => {
    onEditSubmit(editedComment);
  };
  const handleCancel = () => {
    onCancelFn();
  };

  return (
    <div className="Comment">
      {edit}
      <b>{comment.name}</b>
      {!edit && (
        <div>
          <p>{comment.comment}</p>
          <button onClick={handleEdit}>Edit</button>
          <button value={`${comment.id}`} onClick={handleDelete}>
            Delete
          </button>
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
