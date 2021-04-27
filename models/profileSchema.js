const Bet = require("./betSchema");

const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  username: { type: String },
  serverID: { type: String, required: false },
  coins: { type: Number, default: 10 },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
