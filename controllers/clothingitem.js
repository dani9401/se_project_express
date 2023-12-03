const ForbiddenError = require("../utils/errors/forbidden-error");
const BadRequestError = require("../utils/errors/bad-request-error");
const DocumentNotFoundError = require("../utils/errors/not-found-error");

const ClothingItem = require("../models/clothingitem");
const {
  BAD_REQUEST,
  DEFAULT_ERROR,
  FORBIDDEN,
  NOT_FOUND,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl, likes } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id, likes })
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({
          message: err.message,
        });
      }
      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send({ items }))
    .catch((err) => {
      console.error(err);
      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

// const updateItem = (req, res) => {
//  const { itemId } = req.params; //params are part of the URL
//  const { imageUrl } = req.body; //body is part of the request body

//  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
//    .orFail()
//    .then((item) => res.send({ data: item }))
//    .catch((err) => {
//      res
//        .status(DEFAULT_ERROR)
//        .send({ message: "An error has occurred on the server." });
//    });
// };

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        throw new ForbiddenError("You are not authorized to delete this item.");
        //return res
        //   .status(FORBIDDEN)
        //   .send({ message: "You are not authorized to delete this item." });
      }
      return item
        .deleteOne()
        .then(() => res.send({ message: "Item deleted." }));
    })

    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID passed"));
      } else if (err.name === "DocumentNotFoundError") {
        next(
          new DocumentNotFoundError(
            "There is no clothing item with the requested id, or the request was sent to a non-existent address",
          ),
        );
      } else {
        next(err);
      }
    });

  //.catch((err) => next(new Error("Authorization error")));
};

//.catch((err) => {
//  console.error(err);
//  if (err.name === "DocumentNotFoundError") {
//    res.status(NOT_FOUND).send({
//      message:
//        "There is no clothing item with the requested id, or the request was sent to a non-existent address",
//    });
//  } else if (err.name === "CastError") {
//    res.status(BAD_REQUEST).send({
//      message: "Invalid ID passed.",
//    });
//  } else {
//    res.status(DEFAULT_ERROR).send({
//      message: "An error has occurred on the server.",
//    });
//  }
//});
//};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({
          message:
            "There is no clothing item with the requested id, or the request was sent to a non-existent address",
        });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({
          message: "Invalid ID passed.",
        });
      } else {
        res.status(DEFAULT_ERROR).send({
          message: "An error has occurred on the server.",
        });
      }
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({
          message:
            "There is no clothing item with the requested id, or the request was sent to a non-existent address",
        });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({
          message: "Invalid ID passed.",
        });
      } else {
        res.status(DEFAULT_ERROR).send({
          message: "An error has occurred on the server.",
        });
      }
    });
};

//next(new Error('Authorization error'))

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
