const ClothingItem = require("../models/clothingitem");
const User = require("../models/user");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);
  console.log(req.user);

  const { name, weather, imageUrl, likes } = req.body;
  //const {ownerId} = req.user;

  ClothingItem.create({ name, weather, imageUrl, User, likes })

    //ClothingItem.find({})
    //   .populate(['owner', 'likes'])
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "ValidationError") {
        res
          .status(400)
          .send({
            message: "This field accepts a value between 2 and 30 characters",
            err,
          });
      } else if (err.name === "something-else") {
        res
          .status(400)
          .send({ message: "something else error on createUser", err });
      }
      res.status(500).send({ message: "Error from createItem", err });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Error from getItems", e });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params; //params are part of the URL
  const { imageUrl } = req.body; //body is part of the request body

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      res.status(500).send({ message: "Error from updateItem", err });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send({ message: "Item has been deleted." }))
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      res.status(500).send({ message: "Error from deleteItem", err });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params.itemId;

  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((like) => res.status(200).send({ like }))
    .catch((err) => {
      res.status(500).send({ message: "Error from likeItem", err });
    });
};

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      res.status(500).send({ message: "Error from dislikeItem", e });
    });

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};

module.exports.createClothingItem = (req, res) => {
  console.log(req.user._id); // _id will become accessible
};
