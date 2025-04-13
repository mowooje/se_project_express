const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getCurrentUser, updateUserProfile } = require("../controllers/users");
const { validateUserProfileUpdate } = require("../middlewares/validation");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateUserProfileUpdate, updateUserProfile);

module.exports = router;
