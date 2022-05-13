const express = require("express");
const { getAllActivities, getOneActivity } = require("../queries/activity");
const commentsController = require("./commentControllers");
const activity = express.Router({ mergeParams: true });
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
  const oneActivity = await getOneActivity(req.params.id);
  if (oneActivity.id) {
    res.status(200).json(oneActivity);
  } else {
    res.status(404).json({ error: "Not Found!" });
  }
});

module.exports = activity;
