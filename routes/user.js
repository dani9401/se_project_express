const router = require("express").Router();

const {
  createUser,
  getUsers,
  getUser,
  loginUser,
} = require("../controllers/user");

// CREATE
router.post("/signup", createUser);
router.post("/signin", loginUser);

// READ
//router.get("/", getUsers);

//router.get("/:userId", getUser);

// UPDATE

// DELETE

module.exports = router;
