const router = require("express").Router();
const clothingItemRoutes = require("./clothingItem");
const userRoutes = require("./user");

router.use("/items", clothingItemRoutes);
router.use("/users", userRoutes);

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});

module.exports = router;
