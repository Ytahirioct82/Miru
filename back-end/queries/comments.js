const db = require("../db/dbConfig");

const getActivityComments = async (id) => {
  try {
    const comments = await db.any(
      "SELECT * FROM comments WHERE activity_id = $1",
      id
    );
    return comments;
  } catch (error) {
    return error;
  }
};

module.exports = { getActivityComments };
