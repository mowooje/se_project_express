const { CONFLICT } = require("./errors");

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT;
    this.name = "ConflictError";
  }
}

module.exports = ConflictError;
