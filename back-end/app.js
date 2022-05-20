const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: "25mb" }));

const activityController = require("./controllers/activityController");
const commentControllers = require("./controllers/commentControllers");

app.use("/activity", activityController);
app.use("/:id/comments", commentControllers);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Miru");
});

app.get("*", (request, response) => {
  response.status(404).json({ Error: "Page Not Found!" });
});

module.exports = app;
