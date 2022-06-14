const express = require("express");

const app = express();
const port = 4000;

const booksRouter = require("./router/books.router");
const usersRouter = require("./router/users.router");
const log = require("./middlewares/log");

app.use(log);

app.use(express.json());
app.use(booksRouter);
app.use(usersRouter);

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
