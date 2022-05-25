const express = require("express");
const cors = require("cors");
const passport = require("passport");
const { initialize } = require("./passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

initialize(passport);
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const timeToLive = 1000 * 60 * 60 * 2;
app.use(
  session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: timeToLive },
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const activityController = require("./controllers/activityController");
const commentControllers = require("./controllers/commentControllers");
const userController = require("./controllers/userController");

// initialize(passport);
app.use("/user", userController);
app.use("/activity", activityController);
app.use("/:id/comments", commentControllers);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Miru");
});

app.get("*", (request, response) => {
  response.status(404).json({ Error: "Page Not Found!" });
});

module.exports = app;
