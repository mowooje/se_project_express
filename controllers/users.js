const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  CONFLICT,
  UNAUTHORIZED,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server" });
    });
};

const updateUserProfile = (req, res) => {
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
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server" });
    });
};

// POST /users

const createUser = async (req, res) => {
  try {
    const { name, avatar, email, password } = req.body;

    if (!email || !password) {
      return res
        .status(BAD_REQUEST)
        .send({ message: "Email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      avatar,
      email,
      password: hashedPassword,
    });

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(201).send({ data: userObj });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res
        .status(CONFLICT)
        .send({ message: "A user with this email already exists." });
    }
    return res
      .status(DEFAULT)
      .send({ message: "An error has occurred on the server" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password are required" });
  }

  try {
    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    const { password: _password, ...userWithoutPassword } = user.toObject();
    return res.send({ token, user: userWithoutPassword });
  } catch (err) {
    console.error(err);
    if (err.message === "Invalid credentials") {
      return res.status(UNAUTHORIZED).send({ message: err.message });
    }
    return res
      .status(DEFAULT)
      .send({ message: "An error has occurred on the server" });
  }
};

module.exports = {
  createUser,
  getCurrentUser,
  login,
  updateUserProfile,
};
