const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getCurrentUser, updateUser } = require("../controllers/user");
const {
  validateGetCurrentUser,
  validateUpdateUser,
} = require("../middlewares/validation");

// CREATE

// READ
router.get("/me", auth, validateGetCurrentUser, getCurrentUser);
// router.get("/:userId", getUser);

// UPDATE
router.patch("/me", auth, validateUpdateUser, updateUser);

// DELETE

module.exports = router;
