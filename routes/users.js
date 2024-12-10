const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUser,
  loginUser,
} = require("../controllers/users");

module.exports = router;
