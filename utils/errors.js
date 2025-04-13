const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const DEFAULT = 500;
const CONFLICT = 409;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;

const BadRequestError = require("./BadRequestError");
const NotFoundError = require("./NotFoundError");
const ForbiddenError = require("./ForbiddenError");
const UnauthorizedError = require("./UnauthorizedError");
const ConflictError = require("./ConflictError");

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  CONFLICT,
  UNAUTHORIZED,
  FORBIDDEN,
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  ConflictError,
};
