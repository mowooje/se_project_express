const router = require("express").Router();
const {
  getUsers,
  createUser,
  getCurrentUser,
  login,
  updateUserProfile,
} = require("../controllers/users");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/me", getCurrentUser);
router.post("/signin", login);
router.patch("/me", updateUserProfile);

module.exports = router;
