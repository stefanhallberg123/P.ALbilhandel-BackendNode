const router = require("express").Router();
const nodemailer = require("nodemailer");
require("dotenv").config();
// nodemailer configs
let Message = require("../model/messages.schema");
let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secureConnection: false,
  port: 587,
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages!");
  }
});
// send from start
router.post("/", async (req, res) => {
  const message = await new Message({
    // from input name in frontend
    regnumber: req.body.regnumber,
    subject: req.body.subject,
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
    dataConsent: req.body.dataConsent,
  }).save();
  res.send(message);
});

router.post("/cars", async (req, res) => {
  const message = await new Message({
    // from input name in frontend
    regnumber: req.body.regnumber,
    subject: req.body.subject,
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
    dataConsent: req.body.dataConsent,
  }).save();
  res.send(message);
});
router.post("/cars/:id", async (req, res) => {
  const message = await new Message({
    // from input name in frontend
    regnumber: req.body.regnumber,
    subject: req.body.subject,
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
    dataConsent: req.body.dataConsent,
  }).save();
  res.send(message);
});

// get all the messages from admin
router.get("/admin/messages", async (req, res) => {
  const message = await Message.find({});
  res.send(message);
});

// get the info from Id to respond message
router.get("/admin/messages/add/:id", async (req, res) => {
  const id = await Message.find({ _id: req.params.id });
  res.send(id);
});

// respond with email
router.post("/admin/message/add/:id", async (req, res) => {
  var email = req.body.email;
  var answer = req.body.answer;
  var subject = req.body.subject;
  // console.log(message);
  var mail = {
    from: "stefanhalllberg@live.se",
    to: email,
    subject: subject,
    text: answer,
  };
  console.log(mail);
  res.send(mail);

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
    }
  });
});
// delete message from id
router.delete("/admin/messages/:id", async (req, res) => {
  const id = await Message.findByIdAndDelete({
    _id: req.params.id,
  });
  res.send(id);
});

module.exports = router;
