const express = require("express");
const {
  addImages,
  getAllImages,
  getActivityImages,
  getOneActivityImage,
} = require("../queries/images");
const images = express.Router({ mergeParams: true });

images.get("/", async (req, res) => {
  const activityImages = await getActivityImages(req.params.id);
  res.status(200).json(activityImages);
});

images.get("/1", async (req, res) => {
  const activityImage = await getOneActivityImage(req.params.id);
  res.status(200).json(activityImage);
});

images.post("/", async (request, response) => {
  const addedImages = await addImages(request.body);
  response.status(200).json(addedImages);
});

module.exports = images;
