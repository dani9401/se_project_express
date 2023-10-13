const User = require("../models/user");

const createUser = (req, res) => {
  ////////////////////////tested on postman
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
        res.status(400).send({
          message: "This field accepts a value between 2 and 30 characters",
          err,
        });
      } else if (err.name === "something-else") {
        res
          .status(400)
          .send({ message: "something else error on createUser", err });
      } else {
        res
          .status(500)
          .send({ message: "An error has occurred on the server.", err }); //////need proper 500 error message
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res
        .status(500)
        .send({ message: "An error has occurred on the server.", err }); //////need proper 500 error message
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "CastError") {
        res
          .status(404)
          .send({ message: "No user with that ID. Please try again.", err });
      } else {
        res
          .status(500)
          .send({ message: "An error has occurred on the server.", err });
      } //////need proper 500 error message
    });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
};
