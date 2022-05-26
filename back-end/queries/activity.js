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

const postActivity = async (
  name,
  description,
  street_address,
  city,
  state,
  zip_code,
  category
) => {
  // const { name, description, street_address, city, state, zip_code, category } =
  //   activity;
  try {
    const newActivity = await db.one(
      "INSERT INTO activity (name, description, street_address, city, state, zip_code, category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, description, street_address, city, state, zip_code, category]
    );
    return newActivity;
  } catch (error) {
    return error;
  }
};

const editActivity = async (id, activity) => {
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
    const edit = await db.one(
      "UPDATE activity SET name=$2, description=$3, street_address=$4, city=$5, state=$6, zip_code=$7, category=$8, image=$9 WHERE id=$1 RETURNING *",
      [
        id,
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
    return edit;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllActivities,
  getOneActivity,
  postActivity,
  editActivity,
};
