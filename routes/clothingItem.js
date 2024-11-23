const router = require("express").Router();

const {
  createItem,
  getItems,
  updateLike,
  deleteItem,
  deleteLike,
} = require("../controllers/clothingItem");

// CRUD

// Create
router.post("/", createItem);

// Read

router.get("/", getItems);

// Update

router.put("/:itemId/likes", updateLike);

// Delete

router.delete("/:itemId", deleteItem);
router.delete("/:itemId/likes", deleteLike);

module.exports = router;
