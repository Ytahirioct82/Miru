const { as } = require("pg-promise");
const db = require("../db/dbConfig");

//get all saved activities based on the user
const getSavedActivity = async (id) => {
  try {
    const saved = await db.any("SELECT * FROM saved WHERE users_id = $1", id);
    return saved;
  } catch (error) {
    return error;
  }
};

//add the saved activity to the saved table
const addSaved = async (saved) => {
  try {
    const { activity_id, users_id } = saved;
    const savedActivity = await db.any(
      "INSERT INTO saved (activity_id, users_id) VALUES ($1, $2) RETURNING *",
      [activity_id, users_id]
    );
    return savedActivity;
  } catch (error) {
    return error;
  }
};

//delete the saved activity from the saved table using the id of the saved table
const deleteSaved = async (id) => {
  try {
    const deletedSavedActivity = await db.one(
      "DELETE FROM saved WHERE id=$1 RETURNING *",
      id
    );
    return deletedSavedActivity;
  } catch (error) {
    return error;
  }
};

module.exports = { getSavedActivity, addSaved, deleteSaved };
