const express = require("express");
const activity = express.Router({ mergeParams: true });
const {
  getAllActivities,
  getAllFavActivities,
  getOneActivity,
  postActivity,
  postFavActivity,
  editActivity,
  deleteFavActivities,
} = require("../queries/activity");

const requiresLogin = (req, res, next) => {
  if (req.user) return next();

  res.sendStatus(401);
};

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

activity.get("/favorites", requiresLogin, async (req, res) => {
  const allFavActivities = await getAllFavActivities(req.user.id);
  if (allFavActivities) {
    res.status(200).json(allFavActivities);
  } else {
    return res.status(404).json({ error: "Favorites Not Found!" });
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
    console.log("addedFav", post);
    res.status(200).json(post);
  } else {
    res.status(404).json({ error: "Cannot Post!" });
  }
});

activity.delete("/:id/favorites", requiresLogin, async (req, res) => {
  const deleteFav = await deleteFavActivities(req.params.id);
  if (deleteFav.id) {
    res.status(200).json(deleteFav);
  } else {
    res.status(404).json({ error: "Cannot delete!" });
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

activity.put("/:id", requiresLogin, async (req, res) => {
  const update = await editActivity(req.params.id, req.body);
  if (update.id) {
    res.status(200).json(update);
  } else {
    res.status(404).json({ error: "Cannot Edit!" });
  }
});

module.exports = activity;
