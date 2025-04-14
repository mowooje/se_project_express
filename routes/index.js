const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const clothingItem = require("./clothingItem");
const { NOT_FOUND } = require("../utils/errors");

const userRouter = require("./users");
const { createUser, login } = require("../controllers/users");

// Validation schemas
const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// Routes with validation
router.post("/signup", signupValidation, createUser);
router.post("/signin", signinValidation, login);

// Protected routes
router.use("/items", clothingItem);
router.use("/users", userRouter);

// 404 handler
router.use((req, res, next) => {
  const err = new Error("Router not found");
  err.statusCode = NOT_FOUND;
  next(err); // Pass the error to the centralized error handler
});

module.exports = router;
