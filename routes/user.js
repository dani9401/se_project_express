const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createUser,
  loginUser,
  getCurrentUser,
  updateUser,
} = require("../controllers/user");

// CREATE
router.post("/signup", createUser);
router.post("/signin", loginUser);

// READ
//router.get("/", getUsers);
router.get("/users/me", auth, getCurrentUser);

//router.get("/:userId", getUser);

// UPDATE
router.patch("/users/me", auth, updateUser);

// DELETE

module.exports = router;
