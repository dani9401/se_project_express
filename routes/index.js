const router = require("express").Router();
const clothingItemRoutes = require("./clothingItem");
const userRoutes = require("./user");
const { createUser, loginUser } = require("../controllers/user");
const { validateNewUser, validateLogin } = require("../middlewares/validation");
const NotFoundError = require("../utils/errors/not-found-error");

router.use("/items", clothingItemRoutes);
router.use("/users", userRoutes);

router.post("/signup/", validateNewUser, createUser);
router.post("/signin/", validateLogin, loginUser);

router.use((req, res, next) => {
  console.log(res);
  // res.status(NOT_FOUND).send({
  //   message: "The request was sent to a non-existent address",
  // });
  return next(
    new NotFoundError("The request was sent to a non-existent address"),
  );
});

module.exports = router;
