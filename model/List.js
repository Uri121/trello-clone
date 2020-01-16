const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  id: {
    type: String,
    unique: true,
    required: true
  }
});


//create Schema
const ListSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  id: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  cards:[CardSchema]
});

module.exports = List = mongoose.model("list", ListSchema);
