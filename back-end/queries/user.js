const db = require("../db/dbConfig");

const postNewUser = async (userInfo) => {
  const { name, email, password } = userInfo;
  try {
    const found = await db.any("SELECT * FROM users WHERE email=$1", email);

    if (!found.length) {
      const newUser = await db.one("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [
        name,
        email,
        password,
      ]);

      return newUser;
    } else {
      return { message: `user with email already exist` };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  postNewUser,
};
