const express = require("express");
const activity = express.Router({ mergeParams: true });
const { getAllActivities, getOneActivity, postActivity, editActivity } = require("../queries/activity");

const commentsController = require("./commentControllers");
activity.use("/:id/comments", commentsController);

activity.get("/", async (req, res) => {
  const allActivities = await getAllActivities();
  if (allActivities.length === 0) {
    return res.status(404).json({ error: "Not Found!" });
  } else {
    res.status(200).json(allActivities);
  }
});

activity.get("/:id", async (req, res) => {
  console.log("get activity", req.user);
  const oneActivity = await getOneActivity(req.params.id);
  console.log("Req.user =", req.user);
  if (oneActivity.id) {
    res.status(200).json(oneActivity);
  } else {
    res.status(404).json({ error: "Not Found!" });
  }
});

activity.post("/", async (req, res) => {
  const post = await postActivity(req.body);
  if (post.id) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ error: "Cannot Post!" });
  }
});

activity.put("/:id", async (req, res) => {
  console.log("edit activity", req.user);
  const update = await editActivity(req.params.id, req.body);
  if (update.id) {
    res.status(200).json(update);
  } else {
    res.status(404).json({ error: "Cannot Edit!" });
  }
});

module.exports = activity;
