const express = require("express");

const { getActivityComments, addComment, updateComment, deleteComment } = require("../queries/comments");
const { addImages } = require("../queries/images");

const comments = express.Router({ mergeParams: true });

comments.get("/", async (req, res) => {
  const comments = await getActivityComments(req.params.id);
  res.status(200).json(comments);
});

comments.post("/", async (req, res) => {
  let { name, comment, images } = req.body;

  const activity_id = req.params.id;
  const addedComments = await addComment(name, comment, activity_id);

  if (images) {
    for (const eachImage of images) {
      addImages(activity_id, eachImage);
    }
  }
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
