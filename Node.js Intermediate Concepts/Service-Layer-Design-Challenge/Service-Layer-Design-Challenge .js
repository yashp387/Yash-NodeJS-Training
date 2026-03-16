// You have this controller:
async function createUser(req, res) {
  const user = await User.create(req.body);
  res.json(user);
}
// a) Why is this controller violating Separation of Concerns?
// -> This controller doing multiple things like handling HTTP req/res and database interaction. And ideally controller should manage req/res flow not the business logic so the problem is it mixed database logic with the HTTP logic and the code become harder to run, test and maintain.

// b) Refactor the architecture using Route, Controller, and Service.
// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/users", userController.createUser);

module.exports = router;

// controllers/userController.js
const userService = require("/services/userService");

async function createUser(req, res, next) {
  try {
    const user = await userService.createUser(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = { createUser };

// services/userService.js
const User = require("../models/User");

async function createUser(data) {
  const user = await User.create(data);
  return user;
}

module.exports = { createUser };

// c) Explain one advantage of the Service Layer pattern.
// -> I think the main advantage of service layer pattern is code maintainability and code organization. So code become easy to test, maintain and reuse.
