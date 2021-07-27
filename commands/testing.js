
const Bet = require("../models/betSchema");
const Stock = require("../models/stockSchema");
const Crypto = require("../models/cryptoSchema");
const Invest = require("../models/investSchema");
const Outcome = require("../models/outcomeSchema");
const Profile = require("../models/profileSchema");
const CoinMarketCap = require('coinmarketcap-api')

const moment = require("moment-timezone");
var request = require("request");

module.exports = {
  name: "testing",
  description: "testing testing 123",
  execute(client, message, args, Discord, profileData) {
    Stock.find({}, (error, stocks) => {
      const date = moment.utc().subtract(1, "days").format("YYYY-MM-DD");
      stocks.forEach((stock) => {
          const url = `http://api.marketstack.com/v1/eod/${date}?access_key=${process.env.STOCK_API}&symbols=${stock.ticker}&limit=1`;
          request ({ url, json: true },(error, { body }) => {
              if (error) {
                console.log("Unable to connect", undefined);
              } else if (body.length === 0) {
                console.log("No Stocks", undefined);
              } else {
                closingChange = (((body.data[0].close)-(body.data[0].open))/(body.data[0].open))*100;
                Stock.findOneAndUpdate({ticker: stock.ticker}, { return: closingChange}, (error, stock) => {
                      if(error){
                          console.log(error)
                      }
                })
              }
            }); 
        }) 

  });
  },
};

