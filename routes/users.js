const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
let User = require("../models/user.model");
let Order = require("../models/order.model");
router.route("/").post(async (req, res) => {
  try {
    const { username, password, email, passwordCheck } = req.body;
    let trueusername = username;

    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Nu ati completat toate datele!" });
    // Not all fields have been entered
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "Parola trebuie sa aiba mai mult de 5 caractere!" });
    //Password needs to be 5 charachter long

    if (password != passwordCheck)
      return res.status(400).json({ msg: "Parolele nu coincid!" });

    // The passwords do not match
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "Exista deja un cont cu acest email!" });
    // Account with this email already exists

    if (!username) trueusername = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: trueusername,
      password: passwordHash,
      email,
      role: "user",
      cart: [],
      addresses: [],
    });

    await newUser
      .save()
      .then(() => res.json("User added!"))
      .catch((err) => res.status(400).json("Error:" + err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Nu ati completat toate datele!" });
    //Not all fields have been filled

    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ msg: "Nu exista cont cu acest email!" });
    // There is no account with this email

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Date invalide!" });
    //Invalid credentials
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.route("/").delete(auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {}
});

router.route("/tokenIsValid").post(async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.route("/").get(auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    id: user._id,
    username: user.username,
    role: user.role,
    cart: user.cart,
  });
});

router.route("/getOrders").get(auth, async (req, res) => {
  const user = await User.findById(req.user);

  var allOrders = await Order.find({
    _id: { $in: user.orders },
  });
  console.log(allOrders);
  res.json({
    orders: allOrders,
  });
});
router.route("/cart").put(auth, async (req, res) => {
  let user = await User.findByIdAndUpdate(req.user, { cart: req.body.cart });
  res.json("Cart Updated");
});

router.route("/cart").get(auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    cart: user.cart,
  });
});
module.exports = router;
