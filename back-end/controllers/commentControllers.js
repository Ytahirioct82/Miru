const express = require("express");

const { getActivityComments, addComment, updateComment, deleteComment } = require("../queries/comments");
const { addImages } = require("../queries/images");

const comments = express.Router({ mergeParams: true });
const requiresLogin = (req, res, next) => {
  if (req.user) return next();

  res.sendStatus(401);
};

comments.get("/", async (req, res) => {
  const currentUser = req.user && req.user.id;
  const comments = await getActivityComments(req.params.id);
  const result = comments.map((comment) => {
    return { ...comment, currentUser };
  });

  res.status(200).json(result);
});

comments.post("/", requiresLogin, async (req, res) => {
  const { images } = req.body;
  const user_id = req.user.id;
  const activity_id = req.params.id;
  const name = req.user.name;
  const addedComments = await addComment({ ...req.body, user_id, activity_id, name });

  if (images) {
    for (const eachImage of images) {
      addImages(activity_id, eachImage);
    }
  }
  res.status(200).json(addedComments);
});

comments.put("/:id", requiresLogin, async (req, res) => {
  const comment = await updateComment(req.params.id, req.body);
  res.status(200).json(comment);
});

comments.delete("/:id", requiresLogin, async (req, res) => {
  const comment = await deleteComment(req.params.id);
  if (comment) {
    res.status(200).json(comment);
  } else {
    res.status(404).json({ error: `review with id of ${id} could not be deleted` });
  }
});
module.exports = comments;
