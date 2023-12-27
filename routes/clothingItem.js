const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateClothingItem,
  validateLikeItem,
  validateDeleteItem,
  validateDislikeItem,
} = require("../middlewares/validation");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingitem");

// CRUD

// CREATE
router.post("/", auth, validateClothingItem, createItem);

// READ
router.get("/", getItems);

// UPDATE
router.put("/:itemId/likes", auth, validateLikeItem, likeItem);

// DELETE
router.delete("/:itemId", auth, validateDeleteItem, deleteItem);
router.delete("/:itemId/likes", auth, validateDislikeItem, dislikeItem);

module.exports = router;
