const router = require("express").Router();
let Order = require("../models/order.model");
let Item = require("../models/item.model");
let User = require("../models/user.model");
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");

router.route("/").get(auth, async (req, res) => {
  const user = await User.findById(req.user);
  if (user.role != "admin") res.status(400).json("Unauthorized acces");
  Order.find()
    .sort({ date: -1 })
    .limit(50)
    .then((order) => res.json(order))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/sendemail").post(auth, async (req, res) => {
  const user = await User.findById(req.user);
  if (user.role != "admin") res.status(400).json("Unauthorized acces");

  let message =
    `<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
    <td align="center">
    <img src=\"cid:logo\" width=\"232\" height=\"200\"></img><h1>Confirmare comanda</h1>
    <h1> ID comanda: ` +
    req.body.id +
    `</h1>
    </td>
</tr>
<tr>
    <td align="center">
      <p> Va trimitem acest mail sa va anuntam ca papuceii dumneavoastra sunt in lucru,</p>
      <p> In general termenul de livrare este pana in 4-5 zile in functie de cate comenzi avem</p>
      <p>Pentru orice fel de intrebari ne puteti contacta pe acest mail</p>
    </td>
</tr>
<tr>
    <td align="center">
      <h3> Va multumim pentru comanda! </h3>
      <p> Speram sa va bucurati de papucei cum ne bucuram noi in crearea lor! </p>
    </td>
</tr>
</table>`;

  let transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 587,
    auth: {
      user: "ennababyshoes@yahoo.com",
      pass: "czmuyojjhgmadpfd",
    },
  });
  message = {
    from: "ennababyshoes@yahoo.com",
    to: req.body.email,
    subject: "Confirmare comanda",
    html: message,
    attachments: [
      {
        filename: "logo.png",
        path: "images/logo.png",
        cid: "logo", //same cid value as in the html img src
      },
    ],
  };

  transporter.sendMail(message, (err, info) => {
    console.log(err);
    if (err) {
      res.status(400);
    } else {
      Order.findByIdAndUpdate(req.body.id, { sentemail: true })
        .then(() => {
          res.json("Email sent");
        })
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
});

router.route("/").post((req, res) => {
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
    command,
    deliveryType,
    userID,
  } = req.body;
  if (
    !email ||
    !firstName ||
    !surname ||
    !phone ||
    !address ||
    !states ||
    !city ||
    !zip ||
    !command ||
    !deliveryType
  ) {
    res.status(400).json("Error: Missing information");
  }

  // Increase the popularity but also compute the subtoal for the order
  var subTotal = 0;
  var promise = new Promise((resolve, reject) => {
    command.forEach(async (item, index, array) => {
      await Item.findById(item._id).then(async (response) => {
        let { popularity, price, price_reduced } = response;
        popularity++;
        if (price_reduced) {
          subTotal = subTotal + price_reduced * item.quantity;
        } else {
          subTotal = subTotal + price * item.quantity;
        }
        await Item.findByIdAndUpdate(item._id, { popularity }).catch((err) =>
          res.status(400).json("Error " + err)
        );
        if (index === array.length - 1) resolve();
      });
    });
  });

  promise.then(() => {
    const newOrder = new Order({
      email,
      firstName,
      surname,
      phone,
      address,
      state: states,
      city,
      zip,
      comments,
      command,
      deliveryType,
      date: new Date(),
      userID,
      sentemail: false,
      subtotal: subTotal,
    });

    newOrder.save().then(async (order) => {
      if (userID) {
        var newOrderID = order._id;
        await User.findByIdAndUpdate(
          userID,
          { $push: { orders: newOrderID } },
          { safe: true, upsert: true, new: true }
        ).catch(function (err2) {
          if (err2) {
            console.log(err2);
            res.status(400);
          }
        });

        await User.findByIdAndUpdate(userID, { $set: { cart: [] } }).catch(
          function (err2) {
            if (err2) {
              console.log(err2);
              res.status(400);
            }
          }
        );
      }
    });

    res.json("Order sent");
  });
});

module.exports = router;
