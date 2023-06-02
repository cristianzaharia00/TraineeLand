const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const returnSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
    },
    productName: {
      type: Array,
      required: true,
    },
    orderID: {
      type: String,
    },
    returnReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Return = mongoose.model("Return", returnSchema);

module.exports = Return;
