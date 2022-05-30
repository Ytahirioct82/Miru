const express = require("express");

const { getSavedActivity, addSaved, deleteSaved } = require("../queries/saved");

const saved = express.Router({ mergeParams: true });

saved.get("/", async (request, response) => {
  const saved = await getSavedActivity(request.params.id);
  response.status(200).json(saved);
});

saved.post("/", async (request, response) => {
  const saved = await addSaved(request.body, request.params.id);
  response.status(200).json(saved);
});

saved.delete("/:id", async (request, response) => {
  const saved = await deleteSaved(request.params.id);
  if (saved.id) {
    response.status(200).json(saved);
  } else {
    response.status(404).json({ error: "Could not delete!" });
  }
});

module.exports = saved;
