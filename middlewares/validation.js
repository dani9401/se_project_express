const { Joi, celebrate } = require("celebrate");
const validator = require("validator");
const {
  createItem,
  deleteItem,
  dislikeItem,
  likeItem,
} = require("../controllers/clothingitem");
const {
  createUser,
  loginUser,
  getCurrentUser,
  updateUser,
} = require("../controllers/user");

// - - - - createItem - - - -
router.post(
  "/posts",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      imageUrl: Joi.string().required().min(2), //how to add URL format?
    }),
  }),
  createItem,
);

// - - - - createUser - - - -
router.post(
  "/posts",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      avatar: Joi.string().required().min(2), //how to add URL format?
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);

// - - - - loginUser - - - -
router.post(
  "/posts",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  loginUser,
);

// - - - - deleteItem- - - -
router.delete(
  "/:itemId",
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().hexadecimal().length(24), //check hexadecimal setup correctly
    }),
  }),
  deleteItem,
);

// - - - - dislikeItem- - - -
router.delete(
  "/:itemId/likes",
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().hexadecimal().length(24), //check hexadecimal setup correctly
    }),
  }),
  dislikeItem,
);

// - - - - likeItem- - - -
router.put(
  "/:itemId/likes",
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().hexadecimal().length(24), //check hexadecimal setup correctly
    }),
  }),
  likeItem,
);

// - - - - getCurrentUser- - - -
router.get(
  "/me",
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hexadecimal().length(24), //check hexadecimal setup correctly
    }),
  }),
  getCurrentUser,
);

// - - - - updateUser- - - -
router.patch(
  "/me",
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hexadecimal().length(24), //check hexadecimal setup correctly
    }),
  }),
  updateUser,
);
