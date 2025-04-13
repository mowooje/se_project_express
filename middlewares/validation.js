const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

// custom validator for URL fields
const validateURL = (value, helpers) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    return helpers.error("string.uri");
  }
  return value;
};

const validateUserSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().custom(validateURL).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateUserProfileUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().custom(validateURL).required(),
  }),
});

const validateItemCreate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
    imageUrl: Joi.string().custom(validateURL).required(),
  }),
});

const validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateUserSignup,
  validateUserLogin,
  validateUserProfileUpdate,
  validateItemCreate,
  validateItemId,
};
