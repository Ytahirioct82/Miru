const express = require("express");
const activity = express.Router({ mergeParams: true });
const {
  getAllActivities,
  getOneActivity,
  postActivity,
  editActivity,
} = require("../queries/activity");
const { addImages } = require("../queries/images");

const commentsController = require("./commentControllers");
const imagesController = require("./imageController");
activity.use("/:id/comments", commentsController);
activity.use("/:id/images", imagesController);

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

activity.post("/", async (req, res) => {
  let {
    name,
    description,
    street_address,
    city,
    state,
    zip_code,
    category,
    images,
  } = req.body;
  const post = await postActivity(
    name,
    description,
    street_address,
    city,
    state,
    zip_code,
    category
  );
  for (const eachImage of images) {
    addImages(post.id, eachImage);
  }
  if (post.id) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ error: "Cannot Post!" });
  }
});

activity.put("/:id", async (req, res) => {
  const update = await editActivity(req.params.id, req.body);
  if (update.id) {
    res.status(200).json(update);
  } else {
    res.status(404).json({ error: "Cannot Edit!" });
  }
});

module.exports = activity;
