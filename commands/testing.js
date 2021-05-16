const stockPrice = require("../utils/stockprice");
const newMatchesSoccer = require("../utils/newmatches");
const newMatchesBasketball = require("../utils/newmatchesb");
const newMatchesEsports = require("../utils/newmatchese");
const betResult = require("../utils/betresult");
var request = require("request");
const setOddsB = require("../utils/setOddsB");

const Stock = require("../models/stockSchema");
const Crypto = require("../models/cryptoSchema");
const Invest = require("../models/investSchema");
const Outcome = require("../models/outcomeSchema");
const moment = require("moment-timezone");
const cryptoPriceOpen = require("../utils/cryptopriceopen");
const cryptoPrice = require("../utils/cryptoprice");

module.exports = {
  name: "testing",
  description: "testing testing 123",
  execute(client, message, args, Discord, profileData) {
    /*Outcome.find(
      {
        category: "basketball",
        'option1.0.odds': 0,
      },
      (err, res) => {
          res.forEach((element)=>{
            var options = {
              method: "GET",
              url: "https://v1.basketball.api-sports.io/odds",
              qs: { bet: "2", bookmaker: "2", game: element.outcomeID },
              headers: {
                "x-rapidapi-host": "v1.basketball.api-sports.io",
                "x-rapidapi-key": "e40fc324e790e08e5f948456fd4d1049",
              },
            };
            request(options, function (error, response, body) {
              if (error) throw new Error(error);
              data = JSON.parse(body);
              console.log(data);
              if(data.response[0] !== undefined){
                Outcome.findOneAndUpdate(
                  {
                    category: "basketball",
                    outcomeID: element.outcomeID
                  },{ 'option1.0.odds': parseFloat(
                    data.response[0].bookmakers[0].bets[0].values[0].odd
                  ), 'option1.0.odds2': parseFloat(
                    data.response[0].bookmakers[0].bets[0].values[1].odd
                  )},
                  (err, res) => {
                    console.log(res)

                  });

              }else{
                console.log('odds still off')
              }

            });
          })
      });*/
      const options = {
        method: "GET",
        url: "https://v1.basketball.api-sports.io/odds",
        qs: {
          game: 109254,
          bet: "2", 
          bookmaker: "2"
        },
        headers: {
          "x-rapidapi-host": "v1.basketball.api-sports.io",
          "x-rapidapi-key": "e40fc324e790e08e5f948456fd4d1049",
        },
      };
      request(options, (error, response, body) => {
        data = JSON.parse(body);
        console.log(data)

      });
  }

}






