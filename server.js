const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");

const user = require("./routes/user");
const list = require("./routes/list");
const card = require("./routes/card");

const app = express();

//DB config

//use routes
app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json(), cors());

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//connect to Mongo
mongoose
  .connect(process.env.MONGODB_URI || process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

//Use Routes
app.use("/user", user);
app.use("/list", list);
app.use("/card", card);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
