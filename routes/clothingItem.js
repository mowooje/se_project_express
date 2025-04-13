const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  updateLike,
  deleteItem,
  deleteLike,
} = require("../controllers/clothingItem");

const {
  validateItemCreate,
  validateItemId,
} = require("../middlewares/validation");

// CRUD

// Create
router.post("/", auth, validateItemCreate, createItem);

// Read

router.get("/", getItems);

// Update

router.put("/:itemId/likes", auth, validateItemId, updateLike);

// Delete

router.delete("/:itemId", auth, validateItemId, deleteItem);
router.delete("/:itemId/likes", auth, validateItemId, deleteLike);

module.exports = router;
