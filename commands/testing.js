const stockPrice = require("../utils/stockprice");
const newMatchesSoccer = require("../utils/newmatches");
const newMatchesBasketball = require("../utils/newmatchesb");
const newMatchesEsports = require("../utils/newmatchese");
const betResult = require("../utils/betresult");
const setOddsB = require("../utils/setOddsB");
const Bet = require("../models/stockSchema");

const Stock = require("../models/stockSchema");
const Crypto = require("../models/cryptoSchema");
const Invest = require("../models/investSchema");
const Outcome = require("../models/outcomeSchema");
const Profile = require("../models/profileSchema");

const moment = require("moment-timezone");
const cryptoPriceOpen = require("../utils/cryptopriceopen");
const cryptoPrice = require("../utils/cryptoprice");
const betResultBasketball = require("../utils/betResultBasketball");
const betResultInv = require("../utils/betResultInv");
var request = require("request");
const setOdds = require("../utils/setOdds");

module.exports = {
  name: "testing",
  description: "testing testing 123",
  execute(client, message, args, Discord, profileData) {
    Outcome.find(
      {
        category: "soccer",
        option1: { $exists: true, $eq: [] },
      },
      (err, res) => {
        console.log(res);
        res.forEach((element) => {
          setOdds(element.league, element.outcomeID);
        });
      }
    );
  Outcome.find(
      {
        category: "basketball",
        option1: { $exists: true, $eq: [] },
      },
      (err, res) => {
        console.log(res);
        res.forEach((element) => {
          setOddsB(element.outcomeID);
        });
      }
    );
    /*var randomNumber = function () {
      return (Math.floor(100000000000000000 + Math.random() * 900000000000000000));

    };
    console.time('startthis')
    for (var i = 1; i <= 5000; ++i) {
      Profile.create({
        userID: randomNumber(),
        username: 'genericUser',
        serverID: '836222179963305984',
        coins: 1000,
    },
    (err, res) => {
      if(err){
        console.log(err)
      }
      console.log(res);
      res.save();
    });
    }
    console.timeEnd('startthis')*/
    newMatchesSoccer('euros')

  },
};

