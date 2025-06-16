const crypto = require("crypto");

const generateRandomString = (length = 20) => {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
};

module.exports = generateRandomString;
