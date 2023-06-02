const router = require("express").Router();
let Item = require("../models/item.model");
let User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
let cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");

router.route("/").post(auth, async (req, res) => {
  let { image, title, text, price, price_reduced, tags } = req.body;
  const true_tags = [];
  if (!image || !title || !text || !price)
    return res.status(400).json("Not all fields have been entered");

  const user = await User.findById(req.user);
  if (user.role != "admin") res.status(400).json("Unauthorized acces");
  tags.map((tag) => true_tags.push(tag.value));

  if (!price_reduced) price_reduced = 0;
  let popularity = 0;
  var imageList = [];
  var _id = new mongoose.Types.ObjectId().toHexString();
  image.forEach((img, i) => {
    imageList.push("items/" + _id + "/" + i);
  });
  newItem = new Item({
    _id: _id,
    image: imageList,
    title,
    text,
    price,
    price_reduced,
    tags: true_tags,
    popularity,
    showInShop: true,
  });
  await newItem
    .save()
    .then(() => {
      image.forEach((img, i) => {
        cloudinary.uploader.upload(
          image[i],
          {
            public_id: "items/" + _id + "/" + i,
          },
          function (error, result) {
            console.log(result, error);
          }
        );
      });
      res.json("Item added!");
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/").get(async (req, res) => {
  Item.find()
    .sort({ popularity: -1 })
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/").put(auth, async (req, res) => {
  var { id, title, price, image, price_reduced, text, tags, showInShop } =
    req.body;
  const user = await User.findById(req.user);
  if (user.role != "admin") res.status(400).json("Unauthorized acces");

  const true_tags = [];
  var imageList = [];
  let allPicturesUploaded = true;
  if (!price_reduced) price_reduced = 0;

  tags.map((tag) => true_tags.push(tag.value));

  if (image.length > 0) {
    var promiseArray = [];
    await cloudinary.api
      .delete_resources([
        "items/" + id + "/0",
        "items/" + id + "/1",
        "items/" + id + "/2",
      ])
      .catch((err) => {
        res.status(500).json("Original photos couldn't be deleted");
        return;
      });

    image.every(async (img, i) => {
      promiseArray.push(
        cloudinary.uploader
          .upload(image[i], {
            public_id: "items/" + id + "/" + i,
          })
          .then(async (result) => {
            imageList.push(result.url.split("upload")[1]);
            console.log(result.url.split("upload")[1]);
            return Item.findByIdAndUpdate(id, {
              title,
              price_reduced,
              price,
              image: imageList,
              text,
              tags: true_tags,
              showInShop,
            });
          })
          .then(() => console.log("Picture Uploaded"))
      );
    });
    Promise.all(promiseArray)
      .then(() => {
        res.json("Item Updated");
      })
      .catch((err) =>
        res.status(500).json("Picture Upload Failed because of " + err)
      );
  } else {
    await Item.findByIdAndUpdate(id, {
      title,
      price_reduced,
      price,
      text,
      tags: true_tags,
      showInShop,
    })
      .then(() => {
        res.json("Item Updated");
      })
      .catch((err) => res.status(400).json("Picture Upload Failed"));
  }
});

module.exports = router;
