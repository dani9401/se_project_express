const router = require("express").Router();
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validation");
const { getCurrentUser, updateUser } = require("../controllers/user");

// CREATE

// READ
// router.get("/", getUsers);
router.get("/me", auth, getCurrentUser);

// router.get("/:userId", getUser);

// UPDATE
router.patch("/me", auth, validate, updateUser);

// DELETE

module.exports = router;
