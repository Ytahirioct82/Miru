const express = require("express");
const activity = express.Router({ mergeParams: true });
const {
  getAllActivities,
  getAllFavActivities,
  getOneActivity,
  postActivity,
  postFavActivity,
  editActivity,
} = require("../queries/activity");
const { addImages } = require("../queries/images");

const requiresLogin = (req, res, next) => {
  if (req.user) return next();

  res.sendStatus(401);
};

const imagesController = require("./imageControllers");
const commentsController = require("./commentControllers");
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

activity.get("/favorites", requiresLogin, async (req, res) => {
  const allFavActivities = await getAllFavActivities(req.user.id);
  if (allFavActivities.length === 0) {
    return res.status(404).json({ error: "Not Found!" });
  } else {
    res.status(200).json(allFavActivities);
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

activity.post("/:id/favorites", requiresLogin, async (req, res) => {
  const user_id = req.user.id;
  const activity_id = req.params.id;
  const post = await postFavActivity({ user_id, activity_id });
  if (post.id) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ error: "Cannot Post!" });
  }
});

activity.post("/", async (req, res) => {
  const user_id = req.user.id;
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
    user_id,
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
