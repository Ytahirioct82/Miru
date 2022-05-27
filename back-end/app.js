const express = require("express");
const cors = require("cors");
const passport = require("passport");
const { initialize } = require("./passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

initialize(passport);
const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:8080"],
  })
);
app.use(express.json({ limit: "25mb" }));

app.use(cookieParser());

let timeToLive = 1000 * 60 * 60 * 2;
app.use(
  session({
    name: "session_id",
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: timeToLive },
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use(express.json());

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
