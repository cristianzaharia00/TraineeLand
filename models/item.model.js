const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tags: {
    type: Array,
  },
  price_reduced: {
    type: Number,
  },
  popularity: {
    type: Number,
  },
  showInShop: {
    type: Boolean,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
