const { DEFAULT } = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  const { statusCode = DEFAULT, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === DEFAULT ? "An error occurred on the server" : message,
  });
  next();
};

module.exports = errorHandler;
