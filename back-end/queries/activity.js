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

const postActivity = async (activity) => {
  const {
    name,
    description,
    street_address,
    city,
    state,
    zip_code,
    category,
    image,
  } = activity;
  try {
    const newActivity = await db.one(
      "INSERT INTO activity (name, description, street_address, city, state, zip_code, category, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        name,
        description,
        street_address,
        city,
        state,
        zip_code,
        category,
        image,
      ]
    );
    return newActivity;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllActivities,
  getOneActivity,
  postActivity,
};
