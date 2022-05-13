const { response } = require("express");
const express = require("express");
const activity = express.Router();
const { getAllActivities, getOneActivity } = require("../queries/activity");

activity.get("/", async (req, res) => {
  const allActivities = await getAllActivities();
  res.status(200).json(allActivities);
  if (allActivities.length === 0) {
    response.status(404).json({ error: "Not Found!" });
    return;
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
