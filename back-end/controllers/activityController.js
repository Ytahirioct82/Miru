const { response } = require("express");
const express = require("express");
const activity = express.Router();
const {
  getAllActivities,
  getOneActivity,
  postActivity,
} = require("../queries/activity");

activity.get("/", async (req, res) => {
  const allActivities = await getAllActivities();
  if (allActivities.length === 0) {
    return response.status(404).json({ error: "Not Found!" });
  } else {
    res.status(200).json(allActivities);
  }
});

activity.get("/:id", async (req, res) => {
  const oneActivity = await getOneActivity(req.params.id);
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
    res.status(404).json({ error: "Not Found!" });
  }
});

module.exports = activity;
