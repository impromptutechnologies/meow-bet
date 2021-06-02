const Outcome = require("../../models/outcomeSchema");
const Invest = require("../../models/investSchema");
const Stock = require("../../models/stockSchema");
const Crypto = require("../../models/cryptoSchema");
const moment = require("moment-timezone");
const stockPrice = require("../../utils/stockprice");
const cryptoPrice = require("../../utils/cryptoprice");
const betResult = require("../../utils/betresult");
const betResultBasketball = require("../../utils/betResultBasketball");
const betResultEsports = require("../../utils/betResultEsports");
const betResultInv = require("../../utils/betResultInv");
const newMatchesSoccer = require("../../utils/newmatches");
const newMatchesBasketball = require("../../utils/newmatchesb");
const newMatchesEsports = require("../../utils/newmatchese");
const schedule = require('node-schedule')
const setOddsB = require("../../utils/setOddsB");
const setOdds = require("../../utils/setOdds");

module.exports = async (Discord, client) => {
  console.log("bot online");
  const updateMatches = async () => {
    var date = moment.utc().format("MM-DD HH:mm");
    const outcomes = await Outcome.find({ timeEnd: { $lt: date } });
    console.log(outcomes);
    if (outcomes.length == 0) {
      console.log("no finished matches across the board");
    } else {
      console.log(outcomes.length);
      outcomes.forEach((element) => {
        if (element.category == "esportscod") {
          betResultEsports(element.outcomeID, Discord, client, {
            method: "GET",
            url: `https://api.pandascore.co/codmw/matches/?filter[id]=${element.outcomeID}`,
            headers: {
              Authorization:
                "Bearer hCHqW_AKX0xtmdSF5ZACti9M9LcLsWKKa52M70hWWy7aGEaql5M",
              host: "api.pandascore.co",
              useQueryString: true,
            },
          });
        }
        if (element.category == "esportscsgo") {
          betResultEsports(element.outcomeID, Discord, client, {
            method: "GET",
            url: `https://api.pandascore.co/csgo/matches/?filter[id]=${element.outcomeID}`,
            headers: {
              Authorization:
                "Bearer hCHqW_AKX0xtmdSF5ZACti9M9LcLsWKKa52M70hWWy7aGEaql5M",
              host: "api.pandascore.co",
              useQueryString: true,
            },
          });
        }
        if (element.category == "esportsdota") {
          betResultEsports(element.outcomeID, Discord, client, {
            method: "GET",
            url: `https://api.pandascore.co/dota2/matches/?filter[id]=${element.outcomeID}`,
            headers: {
              Authorization:
                "Bearer hCHqW_AKX0xtmdSF5ZACti9M9LcLsWKKa52M70hWWy7aGEaql5M",
              host: "api.pandascore.co",
              useQueryString: true,
            },
          });
        }
        if (element.category == "esportsleague") {
          betResultEsports(element.outcomeID, Discord, client, {
            method: "GET",
            url: `https://api.pandascore.co/lol/matches/?filter[id]=${element.outcomeID}`,
            headers: {
              Authorization:
                "Bearer hCHqW_AKX0xtmdSF5ZACti9M9LcLsWKKa52M70hWWy7aGEaql5M",
              host: "api.pandascore.co",
              useQueryString: true,
            },
          });
        }
        if (element.category == "basketball") {
          betResultBasketball(element.outcomeID, Discord, client);
        }
        if (element.category == "soccer") {
          betResult(element.outcomeID, Discord, client);
        }
      });
      const deleted = await Outcome.deleteMany({ timeEnd: { $lt: date } });
    }
  };
  setInterval(updateMatches, 60000);




  const newMatches = async () => {
    newMatchesEsports();
    newMatchesBasketball("1");
    setTimeout(newMatchesBasketball.bind(null, '2'), 60000)
    setTimeout(newMatchesBasketball.bind(null, '3'), 120000)
    //setTimeout(newMatchesSoccer.bind(null, 'prem'), 60000)
    //setTimeout(newMatchesSoccer.bind(null, 'champ'), 120000)
    //setTimeout(newMatchesSoccer.bind(null, 'seriea'), 180000)
    setTimeout(newMatchesSoccer.bind(null, 'euro'), 180000)
  }
 schedule.scheduleJob('0 */5 * * *', ()=>{
    newMatches();
  })






const checkOdds = async () => {
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
}
schedule.scheduleJob('*/5 * * * *', ()=>{
  checkOdds();
})

  







  const checkReturn = async () => {
    var day = moment.utc().format("DD");
    var month = moment.utc().format("MM");
    var date = moment.utc().format("MM-DD HH:mm");
    const investmentstock = await Invest.find({ category: "stocks" });
    const investmentcrypto = await Invest.find({ category: "crypto" });
    console.log("stock invests total:", investmentstock.length);
    console.log("crypto invests total:", investmentcrypto.length);

    if (
      date == moment.utc().format(`${month}-${day} 13:20`) &&
      investmentcrypto.length !== 0
    ) {
      cryptoPriceOpen((error, highest) => {
        if (error) {
          return console.log(error);
        }
      });
    }

    if (
      date == moment.utc().format(`${month}-${day} 20:30`) &&
      investmentstock.length !== 0
    ) {
      stockPrice((error, highest) => {
        if (error) {
          return console.log(error);
        }
      })
    }
    if (
      date == moment.utc().format(`${month}-${day} 20:30`) &&
      investmentcrypto.length !== 0
    ) {
      cryptoPrice((error, highest) => {
        if (error) {
          return console.log(error);
        }
      });
    }
    if (
      date == moment.utc().format(`${month}-${day} 20:35`) &&
      (investmentcrypto.length !== 0 || investmentstock.length !== 0)
    ) {
      const higheststock = await Stock.findOne({}).sort({return:-1}).limit(1);;
      const highestcrypto = await Crypto.findOne({}).sort({return:-1}).limit(1);;
      console.log(highestcrypto.symbol, higheststock.ticker);
      betResultInv(higheststock.ticker, "stocks", Discord, client);
      betResultInv(highestcrypto.symbol, "crypto", Discord, client);
    };
  };
  setInterval(checkReturn, 60000);
};
