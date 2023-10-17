const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const { BAD_REQUEST, NOT_FOUND, DEFAULT_ERROR } = require("../utils/errors");

const createUser = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        email: req.body.email,
        password: hash,
        name: req.body,
        avatar: req.body,
      }),
    )
    .then((newUser) => {
      res.send({ data: newUser });
    })
    .catch((err) => {
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
      res.status(401).send({ message: "401 error from userLogin", err });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() => {
      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.send({ user }))
    .catch((err) => {
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

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUser,
};
