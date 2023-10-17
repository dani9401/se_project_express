const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/user");

// CREATE
router.post("/signup", createUser);
router.post("/signin", loginUser);

// READ
//router.get("/", getUsers);
router.get("/users/me", auth, getCurrentUser);

//router.get("/:userId", getUser);

// UPDATE

// DELETE

module.exports = router;
