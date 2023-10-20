const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const {
  BAD_REQUEST,
  DEFAULT_ERROR,
  DUPLICATE,
  NOT_FOUND,
} = require("../utils/errors");

const opts = { runValidators: true };

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      return res
        .status(DUPLICATE)
        .send({ message: "Email already exists in system" });
    }
    return bcrypt
      .hash(password, 10)
      .then((hash) => User.create({ name, avatar, email, password: hash }))
      .then((newUser) => {
        res.send({ data: newUser });
      })
      .catch((err) => {
        console.error(err);
        if (err.name === "ValidationError") {
          res.status(BAD_REQUEST).send({
            message: err.message,
          });
        } else if (err.code === 11000) {
          console.error("Duplicate key error. Document already exists!");
          res.status(DUPLICATE).send({
            message: "Email already exists in our system.",
          });
        } else {
          res
            .status(DEFAULT_ERROR)
            .send({ message: "An error has occurred on the server." });
        }
      });
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ user, token });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({
          message: "Incorrect email address or password.",
        });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: "An error has occurred on the server." });
      }
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({
          message:
            "There is no user with the requested id, or the request was sent to a non-existent address",
        });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({
          message: "Invalid ID passed.",
        });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: "An error has occurred on the server." });
      }
    });
};

const updateUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  const userId = req.user._id;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.findByIdAndUpdate(
        userId,
        { $set: { name, avatar, email, password: hash }, opts },
        { new: true, runValidators: true },
      ),
    )
    // .orFail()
    .then((userInfo) => res.send({ data: userInfo }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({
          message:
            "There is no user with the requested id, or the request was sent to a non-existent address",
        });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({
          message: "Invalid ID passed.",
        });
      } else if (err.name === "ValidatorError") {
        res.status(BAD_REQUEST).send({
          message: "You must enter a valid URL.",
        });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: "An error has occurred on the server." });
      }
    });
};

// const getUsers = (req, res) => {
//  User.find({})
//    .then((users) => res.send({ users }))
//    .catch(() => {

//      res
//        .status(DEFAULT_ERROR)
//        .send({ message: "An error has occurred on the server." });
//    });
// };

// const getUser = (req, res) => {
//  const { userId } = req.params;

//  User.findById(userId)
//    .orFail()
//    .then((user) => res.send({ user }))
//    .catch((err) => {
//      if (err.name === "DocumentNotFoundError") {
//        res.status(NOT_FOUND).send({
//          message:
//            "There is no user with the requested id, or the request was sent to a non-existent address",
//        });
//      } else if (err.name === "CastError") {
//        res.status(BAD_REQUEST).send({
//          message: "Invalid ID passed.",
//        });
//      } else {
//        res
//          .status(DEFAULT_ERROR)
//          .send({ message: "An error has occurred on the server." });
//      }
//    });
// };

module.exports = {
  createUser,
  loginUser,
  getCurrentUser,
  updateUser,
};
