const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingitem");

// CRUD

// CREATE
router.post("/", createItem);

// READ
router.get("/", getItems);

// UPDATE
//router.put("/:itemId", updateItem);
router.put("/:itemId/likes", likeItem);

// DELETE
router.delete("/:itemId", deleteItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
