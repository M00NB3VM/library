const db = require("../database");

function getBooks() {
  const sql = `SELECT * FROM books`;

  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function getBook(id) {
  const sql = `SELECT * FROM books WHERE id = ${id}`;

  return new Promise((resolve, reject) => {
    db.get(sql, (err, rows) => {
      if (err) {
        return reject(err);
      }

      if (!rows) {
        return resolve("Book does not exist");
      } else {
        resolve(rows);
      }
    });
  });
}

function addBook(book) {
  const sql = `INSERT INTO books (title, author, quantity) VALUES (?, ?, ?)`;

  return new Promise((resolve, reject) => {
    if (!book.title || !book.author || !book.quantity) {
      return reject("Please add all information");
    } else {
      db.run(
        sql,
        [`${book.title}`, `${book.author}`, `${book.quantity}`],
        (err) => {
          if (err) {
            return reject(err);
          }
          resolve("Book was successfully added");
        }
      );
    }
  });
}

function deleteBook(id) {
  const book = `SELECT * FROM books WHERE id = ${id}`;
  const sql = `DELETE FROM books WHERE id = ${id}`;

  return new Promise((resolve, reject) => {
    db.get(book, (err, rows) => {
      if (err) {
        return reject(err);
      }

      if (rows === undefined) {
        return reject("Book does not exist");
      } else {
        db.run(sql, (err) => {
          if (err) {
            return reject(err);
          }
          resolve("Book was successfully deleted");
        });
      }
    });
  });
}

function updateBook(id, book) {
  const sql = `UPDATE books SET title = ?, author = ?, quantity = ? WHERE id = ${id}`;

  return new Promise((resolve, reject) => {
    if (!book.title || !book.author || !book.quantity) {
      reject("Could not update");
    } else {
      db.run(
        sql,
        [`${book.title}`, `${book.author}`, `${book.quantity}`],
        (err) => {
          if (err) {
            return reject(err);
          }
          resolve("Book information was successfully updated");
        }
      );
    }
  });
}

function updatePartialBook(id, book) {
  const title = `UPDATE books SET title = ? WHERE id = ${id}`;
  const author = `UPDATE books SET author = ? WHERE id = ${id}`;
  const quantity = `UPDATE books SET quantity = ? WHERE id = ${id}`;

  return new Promise((resolve, reject) => {
    if (book.title || book.author || book.quantity) {
      if (book.title) {
        db.run(title, [`${book.title}`]),
          (err) => {
            if (err) {
              reject(err);
            }
          };
      }

      if (book.author) {
        db.run(author, [`${book.author}`], (err) => {
          if (err) {
            reject(err);
          }
        });
      }

      if (book.quantity) {
        db.run(quantity, [`${book.quantity}`], (err) => {
          if (err) {
            reject(err);
          }
        });
      }

      resolve("Book information was successfully updated");
    } else {
      return reject("Someting went wrong");
    }
  });
}

module.exports = {
  getBooks,
  getBook,
  addBook,
  deleteBook,
  updateBook,
  updatePartialBook,
};
