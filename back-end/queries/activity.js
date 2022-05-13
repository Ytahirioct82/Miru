const db = require("../db/dbConfig");

const getAllActivities = async () => {
  try {
    const allActivities = await db.any("SELECT * FROM activity");
    return allActivities;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllActivities,
};
