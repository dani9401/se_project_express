const mongoose = require('mongoose');
const validator = require('validator');

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
    validator: (v) => validator.isByteLength(v),
    message: "This field accepts a value between 2 and 30 characters",
  }
},
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "You must enter a valid URL",
    }
  },
})

module.exports = mongoose.model("users", user);