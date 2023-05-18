const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cowSchema = new Schema({
  number: String,
  breed: String,
  weight: String,
  price: Number,
});

const Cow = mongoose.model("Cow", cowSchema);

module.exports = Cow;
