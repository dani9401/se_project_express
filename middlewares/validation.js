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
const validateClothingItem = celebrate({
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
});

// - - - - createUser - - - -
//router.post(
//  "/posts",
const validateNewUser = celebrate({
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
});

// - - - - loginUser - - - -
//router.post(
//  "/posts",
const validateLogin = celebrate({
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
});

// - - - - deleteItem- - - -
//router.delete(
//  "/:itemId",
const validateDeleteItem = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hexadecimal().length(24), //check hexadecimal setup correctly
  }),
});

// - - - - dislikeItem- - - -
//router.delete(
//  "/:itemId/likes",
const validateDislikeItem = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hexadecimal().length(24), //check hexadecimal setup correctly
  }),
});

// - - - - likeItem- - - -
//router.put(
//  "/:itemId/likes",
const validateLikeItem = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hexadecimal().length(24), //check hexadecimal setup correctly
  }),
});

// - - - - getCurrentUser- - - -
//router.get(
//  "/me",
const validateGetCurrentUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hexadecimal().length(24), //check hexadecimal setup correctly
  }),
});

// - - - - updateUser- - - -
//router.patch(
//  "/me",
const validateUpdateUser = celebrate({
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
});

module.export = {
  validateClothingItem,
  validateDeleteItem,
  validateDislikeItem,
  validateLikeItem,
  validateLogin,
  validateNewUser,
  validateUpdateUser,
  validateGetCurrentUser,
};
