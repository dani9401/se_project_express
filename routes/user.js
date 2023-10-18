const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getCurrentUser, updateUser } = require("../controllers/user");

// CREATE

// READ
//router.get("/", getUsers);
router.get("/users/me", auth, getCurrentUser);

//router.get("/:userId", getUser);

// UPDATE
router.patch("/users/me", auth, updateUser);

// DELETE

module.exports = router;
