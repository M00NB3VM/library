const fs = require("fs/promises");

async function writeLog(req, res, next) {
  const logEntry = JSON.stringify({
    time: new Date(),
    method: req.method,
    url: req.url,
    status: res.statusCode,
  });

  try {
    await fs.writeFile("log.txt", logEntry, { flag: "a" });
  } catch (err) {
    console.log(err);
  }

  next();
}

module.exports = writeLog;
