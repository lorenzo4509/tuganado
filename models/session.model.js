const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    id: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    expiries: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    sessions: {
      type: String,
      required: true
    },
  },
);

const Sessions = model("Sessions", userSchema);

module.exports = Sessions;
