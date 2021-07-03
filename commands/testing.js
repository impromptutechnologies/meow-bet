
const Bet = require("../models/betSchema");
const Stock = require("../models/stockSchema");
const Crypto = require("../models/cryptoSchema");
const Invest = require("../models/investSchema");
const Outcome = require("../models/outcomeSchema");
const Profile = require("../models/profileSchema");

const moment = require("moment-timezone");
var request = require("request");

module.exports = {
  name: "testing",
  description: "testing testing 123",
  execute(client, message, args, Discord, profileData) {
    Bet.aggregate([
      { $match: { creatorID: message.author.id, status: "unchanged" }},
      { $group: { _id: null, wonamount: { $sum: "$possibleWinnings" }, betamount: { $sum: "$betAmount" } } }
    ], (err, res) => {
      console.log(res[0].wonamount)
      console.log(res[0].betamount)
      Profile.findOneAndUpdate(
        { userID: message.author.id },
        {
          $inc: {
            returntokens: (res[0].wonamount - (res[0].wonamount * 0.05))-res[0].betamount,
            tokens: res[0].wonamount - res[0].wonamount * 0.05,
          },
        },
        (err, user) => {
          console.log(user);
        });
    })
  },
};

