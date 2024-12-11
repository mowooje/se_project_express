const router = require("express").Router();
const {
  getUsers,
  createUser,
  getCurrentUser,
  login,
} = require("../controllers/users");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/me", getCurrentUser);
router.post("/signin", login);

module.exports = router;
