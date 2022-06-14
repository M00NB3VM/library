const express = require("express");
const booksRouter = express.Router();

const booksController = require("../controllers/books.controller");

booksRouter.get("/books", booksController.getAll);
booksRouter.get("/books/:id", booksController.getOne);
booksRouter.post("/books", booksController.addOne);
booksRouter.delete("/books/:id", booksController.removeOne);
booksRouter.put("/books/:id", booksController.putOne);
booksRouter.patch("/books/:id", booksController.patchOne);

module.exports = booksRouter;
