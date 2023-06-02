const router = require("express").Router();
const res = require("express/lib/response");
const auth = require("../middleware/auth");
let Return = require("../models/return.model");
let User = require("../models/user.model");
router.route("/").get(auth, async (req, res) => {
  const user = await User.findById(req.user);
  if (user.role != "admin") res.status(400).json("Unauthorized acces");
  await Return.find()
    .sort({ date: -1 })
    .limit(50)
    .then((order) => res.json(order))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  console.log(req.body);
  const {
    email,
    firstName,
    surname,
    phone,
    address,
    states,
    city,
    zip,
    comments,
    orderID,
    returnReason,
    startDate,
    productName,
  } = req.body;
  console.log(req.body);
  if (
    !email ||
    !firstName ||
    !surname ||
    !phone ||
    !address ||
    !states ||
    !city ||
    !zip ||
    !returnReason ||
    !orderID ||
    !startDate ||
    !productName
  ) {
    res.status(400).json("Error: Missing information");
  }
  newReturn = new Return({
    email,
    firstName,
    surname,
    phone,
    address,
    state: states,
    city,
    zip,
    comments,
    orderID,
    returnReason,
    date: startDate,
    productName,
  });
  newReturn.save((err, retur) => {
    console.log(err);
    if (err) res.status(400);
    res.json("Return added");
  });
});

module.exports = router;
