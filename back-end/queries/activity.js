const activity = require("../controllers/activityController");
const db = require("../db/dbConfig");

const getAllActivities = async () => {
  try {
    const allActivities = await db.any("SELECT * FROM activity");
    return allActivities;
  } catch (error) {
    return error;
  }
};

const getOneActivity = async (id) => {
  try {
    const oneActivity = await db.one("SELECT * FROM activity WHERE id=$1", id);
    return oneActivity;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllActivities,
  getOneActivity,
};
