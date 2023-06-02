/*
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongodb = require('mongodb')
var {google} = require('googleapis');
var indexRouter = require('./routes/index');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

*/
var cloudinary = require("cloudinary").v2;
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const orderRouter = require("./routes/order");
const usersRouter = require("./routes/users");
const itemsRouter = require("./routes/items");
const returnRouter = require("./routes/return");
require("dotenv").config();

// -------------------   Start server   ------------------------------
const port = process.env.PORT || 5000;
var app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

let uri = process.env.ATLAS_DEV_URI;
let cloud_name = process.env.CLOUDINARY_CLOUD_NAME_DEV;
let api_key = process.env.CLOUDINARY_API_KEY_DEV;
let api_secret = process.env.CLOUDINARY_API_SECRET_DEV;
// ------------------- End Server Start  -----------------------------

// Middleware routes

app.use("/order", orderRouter);
app.use("/users", usersRouter);
app.use("/items", itemsRouter);
app.use("/return", returnRouter);

if (process.env.NODE_ENV === "production") {
  uri = process.env.ATLAS_URI;
  cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  api_key = process.env.CLOUDINARY_API_KEY;
  api_secret = process.env.CLOUDINARY_API_SECRET;

  console.log("Running Production enviroment with static files");
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else if (process.env.NODE_ENV === "test") {
  console.log("Running Production enviroment without static files");
  uri = process.env.ATLAS_URI;
  cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  api_key = process.env.CLOUDINARY_API_KEY;
  api_secret = process.env.CLOUDINARY_API_SECRET;
}

// ---------------   Connect to database   -----------------------------

console.log(uri);
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established");
});
// ---------------   End Connect to database  ---------------------------

module.exports = app;
