const activity = require("../controllers/activityController");
const db = require("../db/dbConfig");

const getAllActivities = async () => {
  try {
    const allActivities = await db.any("SELECT * FROM activity");

    return allActivities;
  } catch (error) {
    throw error;
  }
};

const getAllFavActivities = async (id) => {
  try {
    const allFavActivities = await db.any(
      "SELECT * FROM favorites INNER JOIN activity ON activity.id = favorites.activity_id"
    );

    console.log("before filter", allFavActivities);
    const allFav = allFavActivities.filter((fav) => {
      return fav.user_id === id;
    });
    console.log("allFilteredFav", allFav);
    return allFav;
  } catch (error) {
    throw error;
  }
};

const getAllUserActivities = async (id) => {
  try {
    const allUserActivities = await db.any(
      "SELECT * FROM activity WHERE userlisting_id=$1",
      id
    );
    return allUserActivities;
  } catch (error) {
    throw error;
  }
};

const getOneActivity = async (id) => {
  try {
    const oneActivity = await db.one("SELECT * FROM activity WHERE id=$1", id);
    return oneActivity;
  } catch (error) {
    throw error;
  }
};
const postFavActivity = async (activity) => {
  const { user_id, activity_id } = activity;
  console.log("postJs run", activity);
  try {
    const newFavActivity = await db.one(
      "INSERT INTO favorites (user_id, activity_id) VALUES ($1, $2) RETURNING *",
      [user_id, activity_id]
    );
    console.log("postJs returned", newFavActivity);
    return newFavActivity;
  } catch (error) {
    throw error;
  }
};
const postActivity = async (
  userlisting_id,
  name,
  description,
  street_address,
  city,
  state,
  zip_code,
  category
) => {
  try {
    const newActivity = await db.one(
      "INSERT INTO activity (userlisting_id, name, description, street_address, city, state, zip_code, category) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *",
      [
        userlisting_id,
        name,
        description,
        street_address,
        city,
        state,
        zip_code,
        category,
      ]
    );
    return newActivity;
  } catch (error) {
    throw error;
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
    throw error;
  }
};

module.exports = {
  getAllActivities,
  getAllFavActivities,
  getOneActivity,
  postFavActivity,
  postActivity,
  editActivity,
  getAllUserActivities,
};
