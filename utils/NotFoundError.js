const { NOT_FOUND } = require("../utils/statusCodes");

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
    this.name = "NotFoundError";
  }
}

module.exports = NotFoundError;
