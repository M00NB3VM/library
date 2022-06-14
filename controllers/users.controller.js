require("dotenv").config();
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const model = require("../models/users.model");
const library = require("../models/library.model");

async function getAll(req, res) {
  const result = await model.getUsers().catch((err) => {
    res.status(400);
    res.json(err);
  });
  res.json(result);
}

async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    res.json("Plaese enter all information");
    return;
  }

  const user = await model.getUser(email);

  if (user) {
    res.status(400);
    res.json("User already exists");
    return;
  }

  const newUser = { name: name, email: email, password: md5(password) };
  const result = await model.registerUser(newUser);
  res.status(201);
  res.json(result);
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    res.json("Both e-mail and password are required");
    return;
  }

  const user = await model.getUser(email);

  if (!user) {
    res.status(404);
    res.json("User does not exists");
    return;
  }

  const encPassword = md5(password);

  if (user.password !== encPassword) {
    res.status(400);
    res.json("Wrong password");
    return;
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.SECRET_KEY
  );

  res.json(token);
}

async function myInfo(req, res) {
  const { id, name, email } = req.user;

  const bookresult = await library.getBorrowedBooks(id);

  res.json({ name, email, books: bookresult });
}

async function lendBook(req, res) {
  const { id } = req.user;
  const { bookId } = req.body;

  if (!bookId) {
    res.status(400);
    res.json("Book id is required");
    return;
  }

  const result = await library.lending(id, bookId).catch((err) => {
    res.status(404);
    res.json(err);
    return;
  });

  res.json(result);
}

async function returnBook(req, res) {
  const { id } = req.user;
  const { bookId } = req.body;

  if (!bookId) {
    res.status(400);
    res.json("Book id is required");
    return;
  }

  const result = await library.returning(id, bookId).catch((err) => {
    res.status(404);
    res.json(err);
    return;
  });

  res.json(result);
}

module.exports = {
  getAll,
  register,
  login,
  myInfo,
  lendBook,
  returnBook,
};
