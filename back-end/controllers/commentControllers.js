const express = require("express");

const { getActivityComments } = require("../queries/comments");

const comments = express.Router({ mergeParams: true });

comments.get("/", async (req, res) => {
  const comments = await getActivityComments(req.params.id);
  res.status(200).json(comments);
});

module.exports = comments;
