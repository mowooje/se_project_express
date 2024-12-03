const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUser,
  loginUser,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);
router.post("/login", loginUser);

module.exports = router;
