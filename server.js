const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userForm = require("./routes/userForm");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(userForm);

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongoDB database connection");

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`server is running on ${port}`);
  });
});
