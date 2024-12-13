const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  updateLike,
  deleteItem,
  deleteLike,
} = require("../controllers/clothingItem");

// CRUD

// Create
router.post("/", auth, createItem);

// Read

router.get("/", getItems);

// Update

router.put("/:itemId/likes", auth, updateLike);

// Delete

router.delete("/:itemId", auth, deleteItem);
router.delete("/:itemId/likes", auth, deleteLike);

module.exports = router;
