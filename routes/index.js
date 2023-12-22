const router = require("express").Router();
const clothingItemRoutes = require("./clothingItem");
const userRoutes = require("./user");
const { createUser, loginUser } = require("../controllers/user");
const { NOT_FOUND } = require("../utils/errors");
const validate = require("../middlewares/validation");

router.use("/items", clothingItemRoutes);
router.use("/users", userRoutes);

router.post("/signup/", validate, createUser);
router.post("/signin/", validate, loginUser);

router.use((req, res) => {
  console.log(res);
  res.status(NOT_FOUND).send({
    message: "The request was sent to a non-existent address",
  });
});

module.exports = router;
