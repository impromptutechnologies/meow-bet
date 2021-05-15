const Stock = require("../../models/stockSchema");
const Crypto = require("../../models/cryptoSchema");
const Outcome = require("../../models/outcomeSchema");
const Bet = require("../../models/betSchema");
const Invest = require("../../models/investSchema");
const moment = require("moment-timezone");
const stockPrice = require("../../utils/stockprice");
const cryptoPrice = require("../../utils/cryptoprice");
const betResult = require("../../utils/betresult");
const betResultBasketball = require("../../utils/betResultBasketball");
const betResultEsports = require("../../utils/betResultEsports");
const newMatchesSoccer = require("../../utils/newmatches");
const newMatchesBasketball = require("../../utils/newmatchesb");
const newMatchesEsports = require("../../utils/newmatchese");

module.exports = async (Discord, client) => {
    console.log('bot online')
    const updateMatches = async () => {
      var date = moment.utc().format("MM-DD HH:mm");
      const outcomes = await Outcome.find({timeEnd: { $lt: date }});
      console.log(outcomes);
      if(outcomes.length == 0){
          console.log('no finished matches/games')
          const soccerGames = await Outcome.find({timeStart: { $gt: date }, category: "soccer", league: "prem"});
          const soccerGamesc = await Outcome.find({timeStart: { $gt: date }, category: "soccer", league: "champ"});
          const soccerGamesi = await Outcome.find({timeStart: { $gt: date }, category: "soccer", league: "rest", spec:"seriea"});
          const soccerGamesl = await Outcome.find({timeStart: { $gt: date }, category: "soccer", league: "rest", spec:"laliga"});
          //maybe we need to divide la liga and serie a and bundesliga
          const basketballGames = await Outcome.find({timeStart: { $gt: date }, category: "basketball"});
          const esports = await Outcome.find({timeStart: { $gt: date }, category: "esp", league: "rest", spec:"laliga"});
          console.log('Number of not started basketball outcomes - ', basketballGames.length)
          console.log('Number of not started premier league outcomes - ', soccerGames.length)
          console.log('Number of not started champions league outcomes - ', soccerGamesc.length)
          console.log('Number of not started seriea outcomes - ', soccerGamesi.length)
          console.log('Number of not started laliga outcomes - ', soccerGamesl.length)
          if(soccerGames.length == 0){
              newMatchesSoccer("prem");
          }
          if(soccerGamesc.length == 0){
            newMatchesSoccer("champ");
          }
          if(soccerGamesi.length == 0){
            newMatchesSoccer("seriea");
          }
          if(soccerGamesl.length == 0){
            setTimeout(newMatchesSoccer.bind(null, 'laliga'), 10000)
          }
          if(basketballGames.length == 0){
            newMatchesBasketball();
          }
          
      } else{
          console.log(outcomes.length)
          outcomes.forEach((element) => {
              /*if(element.category == "esportscod"){
                  betResultEsports(element.outcomeID, Discord, client,{
                    method: 'GET',
                    url: `https://api.pandascore.co/codmw/matches/upcoming?filter[id]=${element.outcomeID}`,
                    headers: {
                      'Authorization': 'Bearer hCHqW_AKX0xtmdSF5ZACti9M9LcLsWKKa52M70hWWy7aGEaql5M',
                      'host': 'api.pandascore.co',
                      useQueryString: true
                    }
                });
              }
              if(element.category == "esportscsgo"){
                betResultEsports(element.outcomeID, Discord, client, {
                  method: 'GET',
                  url: `https://api.pandascore.co/csgo/matches/upcoming?filter[id]=${element.outcomeID}`,
                  headers: {
                    'Authorization': 'Bearer hCHqW_AKX0xtmdSF5ZACti9M9LcLsWKKa52M70hWWy7aGEaql5M',
                    'host': 'api.pandascore.co',
                    useQueryString: true
                  }
                });
            }
            if(element.category == "esportsdota"){
                  betResultEsports(element.outcomeID, Discord, client, {
                    method: 'GET',
                    url: `https://api.pandascore.co/dota2/matches/upcoming?filter[id]=${element.outcomeID}`,
                    headers: {
                      'Authorization': 'Bearer hCHqW_AKX0xtmdSF5ZACti9M9LcLsWKKa52M70hWWy7aGEaql5M',
                      'host': 'api.pandascore.co',
                      useQueryString: true
                    }
                  });
              }

              if(element.category == "esportsleague"){
                betResultEsports(element.outcomeID, Discord, client, {
                  method: 'GET',
                  url: `https://api.pandascore.co/lol/matches/upcoming?filter[id]=${element.outcomeID}`,
                  headers: {
                    'Authorization': 'Bearer hCHqW_AKX0xtmdSF5ZACti9M9LcLsWKKa52M70hWWy7aGEaql5M',
                    'host': 'api.pandascore.co',
                    useQueryString: true
                  }
                });
              }*/
              if(element.category == "basketball"){
                  betResultBasketball(element.outcomeID, Discord, client);
              } 
              if(element.category == "soccer"){
                  betResult(element.outcomeID, Discord, client);
              }
          })
          const deleted = await Outcome.deleteMany({timeEnd: { $lt: date }})
      }
      
      //setTimeout(updateMatches, 1000 * 10);
  }
  setInterval(updateMatches, 60000);
  

    const checkReturn = async () => {
        var day = moment.utc().format("DD");
        var month = moment.utc().format("MM");
        var date = moment.utc().format("MM-DD HH:mm");
        const investmentstock = await Invest.find({category:"stocks"});
        const investmentcrypto = await Invest.find({category:"crypto"});
        console.log("stock invests total:", investmentstock.length);
        console.log("crypto invests total:", investmentcrypto.length);

        if (
          date == moment.utc().format(`${month}-${day} 13:29`) &&
          investmentcrypto.length !== 0
        ){
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
              });
        
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
        //setTimeout(checkReturn, 1000 * 10);
      };
      setInterval(checkReturn, 60000);
      
}
    
      
