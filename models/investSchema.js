const mongoose = require("mongoose");
const investSchema = new mongoose.Schema({
  creatorID: { type: String, required: true },
  serverID: { type: String, required: false },
  creatorName: { type: String, required: true },
  investID: { type: String, required: true },
  investAmount: { type: Number, required: true },
  Code: { type: String, required: true },
  possibleEarnings: { type: Number, required: true },
});
const Invest = mongoose.model("Invest", investSchema);

module.exports = Invest;
