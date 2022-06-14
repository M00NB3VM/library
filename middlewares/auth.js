const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(403);
    res.send("Access not allowed");
    return;
  }

  const [prefix, currentToken] = token.split(" ");

  try {
    const dec = jwt.verify(currentToken, process.env.SECRET_KEY);
    req.user = dec;
  } catch (err) {
    res.status(400);
    res.send("Something went wrong");
    return;
  }

  next();
}

module.exports = verifyToken;
