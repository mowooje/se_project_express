const { UNAUTHORIZED } = require("./errors");

class UnauthrorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UnauthrorizedError;
    this.name = "UnauthrorizedError";
  }
}

module.exports = UnauthrorizedError;
