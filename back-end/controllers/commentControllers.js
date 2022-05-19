const express = require("express");

const { getActivityComments, addComment, updateComment, deleteComment } = require("../queries/comments");

const comments = express.Router({ mergeParams: true });

comments.get("/", async (req, res) => {
  const comments = await getActivityComments(req.params.id);
  res.status(200).json(comments);
});

comments.post("/", async (req, res) => {
  const activity_id = req.params.id;
  const addedComments = await addComment({ ...req.body, activity_id });
  res.status(200).json(addedComments);
});

comments.put("/:id", async (req, res) => {
  const comment = await updateComment(req.params.id, req.body);
  res.status(200).json(comment);
});

comments.delete("/:id", async (req, res) => {
  const comment = await deleteComment(req.params.id);
  if (comment) {
    res.status(200).json(comment);
  } else {
    res.status(404).json({ error: `review with id of ${id} could not be deleted` });
  }
});
module.exports = comments;
