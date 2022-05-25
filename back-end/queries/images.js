const db = require("../db/dbConfig");

const getAllImages = async () => {
  try {
    const allImages = await db.any("SELECT * FROM images");
    return allImages;
  } catch (error) {
    return error;
  }
};

const getActivityImages = async (id) => {
  try {
    const images = await db.any(
      "SELECT * FROM images WHERE activity_id=$1",
      id
    );
    return images;
  } catch (error) {
    return error;
  }
};

const addImages = async (images) => {
  const { content, fileName, contentType, length, activity_id } = images;
  try {
    addedImage = db.any(
      "INSERT INTO images (content,fileName,contentType,length,activity_id) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [content, fileName, contentType, length, activity_id]
    );
    return addedImage;
  } catch (error) {
    return error;
  }
};

module.exports = {
  addImages,
  getAllImages,
  getActivityImages,
};
