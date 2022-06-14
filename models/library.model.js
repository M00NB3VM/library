const db = require("../database");

const bookModel = require("./books.model");

function getBorrowedBooks(id) {
  const sql = `SELECT title, author FROM borrowedBooks 
  JOIN users ON userId = users.id
  JOIN books ON bookId = books.id
    WHERE userId = ?
  ;`;

  return new Promise((resolve, reject) => {
    db.all(sql, id, (err, rows) => {
      if (err) {
        return reject(err);
      }

      if (rows.length === 0) {
        resolve("You have no borrowed books");
      } else if (rows.length >= 1) {
        resolve(rows);
      }
    });
  });
}

async function lending(userId, bookId) {
  const sql = `INSERT INTO borrowedBooks (userId, bookId) VALUES (?, ?);`;

  const findBook = `SELECT * FROM books WHERE id = ${bookId}`;

  return new Promise((resolve, reject) => {
    db.get(findBook, (err, rows) => {
      if (err) {
        return reject(err);
      } else if (!rows) {
        return reject("Book does not exist");
      } else if (rows.quantity === 0) {
        return reject("Currently no available copies of wanted book");
      } else {
        const updateQ = `UPDATE books SET quantity  = quantity -1 WHERE id = ${bookId}`;
        db.run(updateQ);

        db.run(sql, [userId, bookId], (err) => {
          if (err) {
            return reject(err);
          }
          resolve(`You have borrowed ${rows.title} by ${rows.author}`);
        });
      }
    });
  });
}

async function returning(userId, bookId) {
  const currentLoan = `SELECT * FROM borrowedBooks where userId = ? AND bookId = ?`;
  const sql = `DELETE FROM borrowedBooks WHERE userId = ? AND bookId = ?;`;

  const findBook = `SELECT * FROM books WHERE id = ${bookId}`;

  return new Promise((resolve, reject) => {
    db.get(findBook, (err, rows) => {
      if (err) {
        return reject(err);
      } else if (!rows) {
        return reject("Book not found");
      } else {
        db.all(currentLoan, [userId, bookId], (err, rows) => {
          if (err) {
            return reject(err);
          }
          if (rows.length === 0) {
            return reject("You don't have this book on loan");
          } else {
            const updateQ = `UPDATE books SET quantity  = quantity +1 WHERE id = ${bookId}`;
            db.run(updateQ);

            db.run(sql, [userId, bookId], (err) => {
              if (err) {
                return reject(err);
              }
              resolve(`Book successfully returned`);
            });
          }
        });
      }
    });
  });
}

module.exports = { getBorrowedBooks, lending, returning };
