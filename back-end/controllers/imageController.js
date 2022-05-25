const express = require("express");
// const images = express.Router();
const {
  addImages,
  getAllImages,
  getActivityImages,
} = require("../queries/images");
const images = express.Router({ mergeParams: true });

// images.get("/", async (req, res) => {
//   const allImages = await getAllImages();
//   console.log(allImages);
//   res.status(200).json(allImages);
// });

images.get("/", async (req, res) => {
  const activityImages = await getActivityImages(req.params.id);
  res.status(200).json(activityImages);
});

images.post("/", async (request, response) => {
  const addedImages = await addImages(request.body);
  response.status(200).json(addedImages);
});

module.exports = images;
