const mongoose = require("mongoose");

const outcomeSchema = new mongoose.Schema({
  outcomeID: { type: String, required: true },
  category: { type: String, required: true },
  team1: { type: String, required: true },
  team2: { type: String, required: true },
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  option1: [
    {
      betCode: {
        type: String,
        required: true,
      },
      odds: {
        type: Number,
        required: true,
      },
      betCode2: {
        type: String,
        required: true,
      },
      odds2: {
        type: Number,
        required: true,
      },
      betCode3: {
        type: String,
      },
      odds3: {
        type: Number,
      },
    },
  ],
});

outcomeSchema.methods.addOptions = async function (option1) {
  const user = this;
  const betCode = option1[0];
  const odds = option1[1];
  const betCode2 = option1[2];
  const odds2 = option1[3];
  const betCode3 = option1[4];
  const odds3 = option1[5];
  user.option1 = user.option1.concat({
    betCode,
    odds,
    betCode2,
    odds2,
    betCode3,
    odds3,
  });
  await user.save();
};

const Outcome = mongoose.model("Outcome", outcomeSchema);

module.exports = Outcome;
