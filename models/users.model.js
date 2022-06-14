const db = require("../database");

function getUsers() {
  const sql = `SELECT id, name, email FROM users`;

  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function getUser(email) {
  const sql = `SELECT * FROM users WHERE email = ?`;

  return new Promise((resolve, reject) => {
    db.get(sql, email, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function registerUser(user) {
  const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

  return new Promise((resolve, reject) => {
    db.run(sql, [user.name, user.email, user.password], (err) => {
      if (err) {
        return reject(err);
      }

      resolve("You have successfully signed up");
    });
  });
}

module.exports = { getUsers, getUser, registerUser };
