const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//create Schema
const CardSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  id: {
    type: String,
    unique: true,
    required: true
  },
  listID:{
    type:String,
    required:true
  }
});

module.exports = Card = mongoose.model("card", CardSchema);
