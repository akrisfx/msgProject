// import mongoose from 'mongoose';
const mongoose = require("mongoose");
const { Schema } = mongoose;

const message = new Schema({
  id: { type: Number, default: 0 },
  username: { type: String, default: "User" },
  content: { type: String, default: "" },
  time: {
    year: String,
    month: String,
    day: String,
    hours: String,
    minutes: String,
    seconds: String
  }
});

module.exports = mongoose.model("Message", message);