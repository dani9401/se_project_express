const User = require("../models/user");
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT_ERROR,
} = require("../utils/errors");

const createUser = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, avatar, owner } = req.body;

  User.create({ name, avatar })
    .then((newUser) => {
      res.send({ data: newUser });
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({
          message: "This field accepts a value between 2 and 30 characters",
          err,
        });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: "An error has occurred on the server.", err });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch((err) => {
      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server.", err });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "CastError") {
        res
          .status(NOT_FOUND)
          .send({ message: "No user with that ID. Please try again.", err });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: "An error has occurred on the server.", err });
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
};
