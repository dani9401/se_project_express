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

// - - - URL Validator Function - - -
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// - - - - createItem - - - -
router.post(
  "/posts",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      imageUrl: Joi.string().required().custom(validateURL).messages({
        "string.empty": 'The "imageUrl" field must be filled in',
        "string.uri": 'the "imageUrl" field must be a valid url',
      }),
      weather: Joi.string().valid("hot", "warm", "cold").required(),
    }),
  }),
  createItem,
),
  // - - - - createUser - - - -
  router.post(
    "/posts",
    celebrate({
      body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30).messages({
          "string.min": 'The minimum length of the "name" field is 2',
          "string.max": 'The maximum length of the "name" field is 30',
          "string.empty": 'The "name" field must be filled in',
        }),
        avatar: Joi.string().required().custom(validateURL).messages({
          "string.empty": 'The "avatar" field must be filled in',
          "string.uri": 'the "avatar" field must be a valid url',
        }),
        email: Joi.string().required().email().messages({
          "string.empty": 'The "email" field must be filled in',
          "string.uri": 'the "email" field must be a valid email',
        }),
        password: Joi.string().required().min(8).messages({
          "string.empty": 'The "password" field must be filled in',
          "string.min": 'The minimum length of the "password" field is 8',
        }),
      }),
    }),
    createUser,
  );

// - - - - loginUser - - - -
router.post(
  "/posts",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email().messages({
        "string.empty": 'The "email" field must be filled in',
        "string.uri": 'the "email" field must be a valid email',
      }),
      password: Joi.string().required().min(8).messages({
        "string.empty": 'The "password" field must be filled in',
        "string.min": 'The minimum length of the "password" field is 8',
      }),
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
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      avatar: Joi.string().required().custom(validateURL).messages({
        "string.empty": 'The "avatar" field must be filled in',
        "string.uri": 'the "avatar" field must be a valid url',
      }),
    }),
  }),
  updateUser,
);
