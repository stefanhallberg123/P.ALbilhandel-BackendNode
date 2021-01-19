const mongoose = require("mongoose");

const Message = new mongoose.Schema({
  regnumber: { type: String },
  subject: { type: String },
  name: { type: String },
  email: { type: String },
  description: { type: String },
  id: { type: mongoose.Schema.Types.ObjectId },
  dataConsent: { type: Boolean },
});

const MessageSchema = mongoose.model("message", Message);

module.exports = MessageSchema;
