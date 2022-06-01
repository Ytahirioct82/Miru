import React from "react";
import { useState, useEffect } from "react";

export const Comment = ({
  comment,
  edit,
  onEditFn,
  onCancelFn,
  onEditSubmit,
  onDeleteFn,
}) => {
  const [editedComment, setEditedComment] = useState(comment);
  useEffect(() => {
    setEditedComment(comment);
  }, [comment]);

  const handleChange = (event) => {
    setEditedComment({
      ...editedComment,
      [event.target.id]: event.target.value,
    });
  };

  //toggles between comment/buttons to user edit text input
  const handleEdit = () => {
    onEditFn(comment);
  };
  //toggles between comment/buttons to user edit text input
  const handleCancel = () => {
    onCancelFn();
  };

  // submits edited comment to the back end.
  const handleSubmit = () => {
    onEditSubmit(editedComment);
  };

  // not working yet. need back end to handel delete.
  const handleDelete = (event) => {
    onDeleteFn(event.target.value);
  };

  return (
    <div className="Comment" key={comment.id}>
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
