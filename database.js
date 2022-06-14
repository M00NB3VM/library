const sqlite3 = require("sqlite3").verbose();
const md5 = require("md5");

const db = new sqlite3.Database("./db.sqlite", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }

  console.log("Connected to library");

  const bookStatement = `CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    quantity INTEGER
  )`;

  const userStatement = `CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  )`;

  const borrowedBooksStatement = `CREATE TABLE borrowedBooks (
      userId INTEGER,
      bookId INTEGER
  )`;

  db.run(bookStatement, (error) => {
    if (error) {
      console.error(error.message);
      return;
    }

    // Part of my actual TBR for the summer of 2022:

    const insertBook = `INSERT INTO books (title, author, quantity) VALUES (?, ?, ?)`;
    db.run(insertBook, ["Daughter of the moon goddess", "Sue Lynn Tan", 2]);
    db.run(insertBook, ["A magic steeped in poison", "Judy I. Lin", 1]);
    db.run(insertBook, [
      "Crowded vol 2: glitter dystopia",
      "Christopher Sebela",
      3,
    ]);
  });

  db.run(userStatement, (error) => {
    if (error) {
      console.error(error.message);
      return;
    }

    const insertUser = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.run(insertUser, [
      "Tony Stark",
      "tony@starkenterprises.com",
      md5("Ironman"),
    ]);
    db.run(insertUser, [
      "Peter Parker",
      "peterparker@mail.com",
      md5("Spiderman"),
    ]);
    db.run(insertUser, [
      "Gwen Stacy",
      "gwenstacy@mail.com",
      md5("Ghostspider"),
    ]);
  });

  db.run(borrowedBooksStatement, (error) => {
    if (error) {
      console.error(error.message);
      return;
    }

    const insertBorrowedBooks = `INSERT INTO borrowedBooks (userId, bookId) VALUES (?, ?)`;
    db.run(insertBorrowedBooks, [1, 40]);
    db.run(insertBorrowedBooks, [3, 1]);
    db.run(insertBorrowedBooks, [3, 2]);
    db.run(insertBorrowedBooks, [3, 3]);
    db.run(insertBorrowedBooks, [4, 2]);
    db.run(insertBorrowedBooks, [4, 41]);
  });
});

module.exports = db;
