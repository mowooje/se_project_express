const { NOT_FOUND } = require("./statusCodes");

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
    this.name = "NotFoundError";
  }
}

module.exports = NotFoundError;
