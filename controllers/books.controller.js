const model = require("../models/books.model");

async function getAll(req, res) {
  const result = await model.getBooks().catch((err) => {
    res.status(400);
    res.json(err);
  });
  res.json(result);
}

async function getOne(req, res) {
  const result = await model.getBook(req.params.id).catch((err) => {
    res.status(404);
    res.json(err);
  });
  res.json(result);
}

async function addOne(req, res) {
  const result = await model.addBook(req.body).catch((err) => {
    res.status(400);
    res.json(err);
  });
  res.status(201);
  res.json(result);
}

async function removeOne(req, res) {
  const result = await model.deleteBook(req.params.id).catch((err) => {
    res.status(400);
    res.json(err);
  });
  res.json(result);
}

async function putOne(req, res) {
  const result = await model
    .updateBook(req.params.id, req.body)
    .catch((err) => {
      res.status(400);
      res.json(err);
    });
  res.json(result);
}

async function patchOne(req, res) {
  const result = await model
    .updatePartialBook(req.params.id, req.body)
    .catch((err) => {
      res.status(400);
      res.json(err);
    });
  res.json(result);
}

module.exports = {
  getAll,
  getOne,
  addOne,
  removeOne,
  putOne,
  patchOne,
};
