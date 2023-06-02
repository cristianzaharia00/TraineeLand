const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    orders: {
      type: Array,
    },
    address: {
      type: Object,
    },
    role: {
      type: String,
    },
    cart: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
