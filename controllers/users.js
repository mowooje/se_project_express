const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
  NotFoundError,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError("User not found"));
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError("Invalid user ID format"));
      }
      return next(err);
    });
};

const updateUserProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => {
      const { password: _password, ...userWithoutPassword } = user.toObject();
      res.status(200).send(userWithoutPassword);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(err.message));
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError("User not found"));
      }
      return next(err);
    });
};

// POST /users

const createUser = async (req, res, next) => {
  try {
    const { name, avatar, email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    const user = await User.create({
      name,
      avatar,
      email,
      password,
    });

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(201).send({ data: userObj });
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictError("A user with this email already exists"));
    }
    if (err.name === "ValidationError") {
      return next(new BadRequestError(err.message));
    }
    return next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }

  try {
    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    const { password: _password, ...userWithoutPassword } = user.toObject();
    return res.send({ token, user: userWithoutPassword });
  } catch (err) {
    if (err.message === "Invalid credentials") {
      return next(new UnauthorizedError("Invalid email or password"));
    }
    return next(err);
  }
};

module.exports = {
  createUser,
  getCurrentUser,
  login,
  updateUserProfile,
};
