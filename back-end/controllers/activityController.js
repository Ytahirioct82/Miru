const express = require("express");
const activity = express.Router();
const { getAllActivities } = require("../queries/activity");

activity.get("/", async (req, res) => {
  const allActivities = await getAllActivities();
  res.status(200).json(allActivities);
});

module.exports = activity;
