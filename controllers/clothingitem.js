const ClothingItem = require("../models/clothingitem");
const { OK, BAD_REQUEST, DEFAULT_ERROR } = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl, likes } = req.body;

  ClothingItem.create({ name, weather, imageUrl, likes })

    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({
          message: "This field accepts a value between 2 and 30 characters",
          err,
        });
      }
      res.status(DEFAULT_ERROR).send({ message: "Error from createItem", err });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(OK).send(items))
    .catch((e) => {
      res.status(DEFAULT_ERROR).send({ message: "Error from getItems", e });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params; //params are part of the URL
  const { imageUrl } = req.body; //body is part of the request body

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(OK).send({ data: item }))
    .catch((err) => {
      res.status(DEFAULT_ERROR).send({ message: "Error from updateItem", err });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(OK).send({ message: "Item has been deleted." }))
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      res.status(DEFAULT_ERROR).send({ message: "Error from deleteItem", err });
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
    .then((like) => res.status(OK).send({ like }))
    .catch((err) => {
      res.status(DEFAULT_ERROR).send({ message: "Error from likeItem", err });
    });
};

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail()
    .then((item) => res.status(OK).send({ data: item }))
    .catch((e) => {
      res.status(DEFAULT_ERROR).send({ message: "Error from dislikeItem", e });
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
