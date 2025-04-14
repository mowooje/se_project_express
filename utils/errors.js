const {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  CONFLICT,
  UNAUTHORIZED,
  FORBIDDEN,
} = require("./statusCodes");

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
