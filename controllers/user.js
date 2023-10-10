const User = require("../models/user");

const createUser = (req, res) => {
  console.log(req)
  console.log(req.body)

  const {name, avatar} = req.body;

  User.create({name, avatar})
  .then((newUser) => {
    res.send({data: newUser})
  })
  .catch((e) => {
    res.status(400).send({message: "Error from createUser", e})
  })
}

const getUsers = (req, res) => {
  User.find({}).then((users) => res.status(200).send(users))
  .catch((e) => {
    res.status(500).send({message: "Error from getUsers", e})
})
};

const getUser = (req, res) => {
  const {userId} = req.params;

  User.findById(userId)
  .orFail()
  .then((user) => res.status(200).send(user))
  .catch((e) => {
    res.status(500).send({message: "Error from getUser", e})
})
};


module.exports = {
  createUser, getUsers, getUser
};