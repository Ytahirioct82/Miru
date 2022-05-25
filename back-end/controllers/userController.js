const express = require("express");
const userLogin = express.Router({ mergeParams: true });
const { postNewUser, initialize } = require("../queries/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
// const db = require("../db/dbConfig");

userLogin.post("/registration", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };

  const addUser = await postNewUser(newUser);
  if (addUser) {
    res.status(200).json(addUser);
  } else {
    res.status(400).json({ error: "User with this email already exist" });
  }
});

userLogin.post("/login/username/password", passport.authenticate("local"), (req, res) => {
  const foundUser = req.user;
  console.log("login", req.user);
  if (foundUser) {
    res.status(200).json(foundUser);
  } else {
    res.status(400).json({ error: "Entered wrong username or password" });
  }
});

module.exports = userLogin;
