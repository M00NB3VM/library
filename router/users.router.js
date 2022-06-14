const express = require("express");
const usersRouter = express.Router();

const auth = require("../middlewares/auth");

const usersController = require("../controllers/users.controller");

usersRouter.get("/users", usersController.getAll);
usersRouter.post("/auth/register", usersController.register);
usersRouter.post("/auth/login", usersController.login);
usersRouter.get("/me", auth, usersController.myInfo);
usersRouter.post("/users/lend", auth, usersController.lendBook);
usersRouter.post("/users/return", auth, usersController.returnBook);

module.exports = usersRouter;
