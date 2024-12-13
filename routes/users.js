const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getUsers,
  createUser,
  getCurrentUser,
  login,
  updateUserProfile,
} = require("../controllers/users");

router.get("/me", getCurrentUser);
router.patch("/me", updateUserProfile);

module.exports = router;
