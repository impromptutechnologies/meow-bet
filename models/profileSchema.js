const Bet = require("./betSchema");

const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  serverID: { type: String },
  coins: { type: Number, default: 10 },
  payments:[]
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
