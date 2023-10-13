const router = require("express").Router();
const clothingItemRoutes = require("./clothingItem");
const userRoutes = require("./user");
const { NOT_FOUND } = require("../utils/errors");

router.use("/items", clothingItemRoutes);
router.use("/users", userRoutes);

router.use((req, res) => {
  res.status(NOT_FOUND).send({
    message: "The request was sent to a non-existent address",
  });
});

module.exports = router;
