const ClothingItem = require('../models/clothingitem');

const createItem = (req, res) => {
  console.log(req)
  console.log(req.body)

  const {name, weather, imageURL} = req.body;

  ClothingItem.create({name, weather, imageURL})
  // above is shorthand notation. Same as {name: name, weather: weather, imageURL: imageURL}
  // this is doable because we're not renaming these things right now
  // if you're renaming the item once you insert it into the db, then this is where it's done
  .then((item) => {
    console.log(item);
    res.send({data:item})
  }).catch((e) => {
    res.status(500).send({message: "Error from createItem", e})
  })
};

const getItems = (req, res) => {
  ClothingItem.find({}).then((items) => res.status(200).send(items))
  .catch((e) => {
    res.status(500).send({message: "Error from getItems", e})
})
};

const updateItem = (req, res) => {
  const {itemId} = req.params;
  const {imageURL} = req.body;

  ClothingItem.findByIdAndUpdate(itemId, {$set: {imageURL}})
  .orFail().then((item) => res.status(200)
  .send({data:item}))
  .catch((e) => {
    res.status(500).send({message: "Error from updateItem", e})
})
}

const deleteItem = (req, res) => {
  const {itemId} = req.params;
  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
  .orFail().then((item) =>
    res.status(204)
    .send({}))
    .catch((e) => {
      res.status(500).send({message: "Error from deleteItem", e})
  })
}

const likeItem = (req, res) => ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail().then((item) => res.status(200)
  .send({data:item}))
  .catch((e) => {
    res.status(500).send({message: "Error from likeItem", e})
})

const dislikeItem = (req, res) => ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $pull: { likes: req.user._id } }, // remove _id from the array
  { new: true },
)
  .orFail().then((item) => res.status(200)
  .send({data:item}))
  .catch((e) => {
    res.status(500).send({message: "Error from dislikeItem", e})
})

module.exports = {
  createItem, getItems, updateItem, deleteItem, likeItem, dislikeItem
};

module.exports.createClothingItem = (req, res) => {
  console.log(req.user._id);// _id will become accessible
};