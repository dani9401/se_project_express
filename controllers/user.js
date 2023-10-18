const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const { BAD_REQUEST, UNAUTHORIZED, DEFAULT_ERROR } = require("../utils/errors");
const opts = { runValidators: true };

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

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
          message: "This field accepts a value between 2 and 30 characters",
        });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({
          message: "New undefined Cast Error.",
        });
      } else if (error.code === 11000) {
        console.error("Duplicate key error. Document already exists!");
        res.status(11000).send({
          message: "Error from createUser.",
        });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: "An error has occurred on the server." });
      }
    });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(UNAUTHORIZED)
        .send({ message: "401 error from loginUser", err });
    });
};

const getCurrentUser = (req, res) => {
  const { userId } = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.send({ user }))
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
  const { name, avatar, email, password, userId } = req.user;

  User.findByIdAndUpdate(
    userId,
    { $set: { name }, opts },
    { $set: { avatar }, opts },
    { $set: { email }, opts },
    { $set: { password }, opts },
    { new: true },
  )
    .orFail()
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
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: "An error has occurred on the server." });
      }
    });
};

//const getUsers = (req, res) => {
//  User.find({})
//    .then((users) => res.send({ users }))
//    .catch(() => {

//      res
//        .status(DEFAULT_ERROR)
//        .send({ message: "An error has occurred on the server." });
//    });
//};

//const getUser = (req, res) => {
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
//};

module.exports = {
  createUser,
  loginUser,
  getCurrentUser,
  updateUser,
};
