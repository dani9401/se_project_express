const router = require("express").Router();
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validation");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingitem");

// CRUD

// CREATE
router.post("/", auth, validate, createItem);

// READ
router.get("/", getItems);

// UPDATE
// router.put("/:itemId", updateItem);
router.put("/:itemId/likes", auth, validate, likeItem);

// DELETE
router.delete("/:itemId", auth, validate, deleteItem);
router.delete("/:itemId/likes", auth, validate, dislikeItem);

module.exports = router;
