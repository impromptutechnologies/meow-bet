const Stock = require("../../models/stockSchema");
const Crypto = require("../../models/cryptoSchema");
const Outcome = require("../../models/outcomeSchema");
const Invest = require("../../models/investSchema");
const moment = require("moment-timezone");
const stockPrice = require("../../utils/stockprice");
const cryptoPrice = require("../../utils/cryptoprice");
const betResult = require("../../utils/betresult");
const newMatchesSoccer = require("../../utils/newmatches");
const newMatchesBasketball = require("../../utils/newmatchesb");
const newMatchesEsports = require("../../utils/newmatchese");

module.exports = async (Discord, client) => {
    console.log('bot online')
    var date = moment.utc().format("MM-DD HH:mm");
    var day = moment.utc().format("DD");
    var month = moment.utc().format("MM");
    if (
      date === moment.utc().format(`${month}-${day} 00:00`)
    ){
      console.log('damnson')
      newMatchesSoccer();
      newMatchesBasketball();
      newMatchesEsports();
    }
    const updateMatches = async () => {
      var date = moment.utc().format("MM-DD HH:mm");
      const outcomes = await Outcome.find({timeEnd: { $lt: date }});
      if(outcomes.length == 0){
          console.log('no finished matches/games')
      } else{
          console.log(outcomes.length)
          outcomes.forEach((element) => {
              /*if(element.category == "esports"){
                  results.betResultEsports(element.outcomeID);
              }
              if(element.category == "basketball"){
                  results.betResultBasketball(element.outcomeID);
              } */
              if(element.category == "soccer"){
                  betResult(element.outcomeID, Discord, client);
              }
          })
          await Outcome.deleteMany({timeEnd: { $lt: date }})
      }
      
      setTimeout(updateMatches, 1000 * 10);
  }
  updateMatches();
  

    const checkReturn = async () => {
        var day = moment.utc().format("DD");
        var month = moment.utc().format("MM");
        var date = moment.utc().format("MM-DD HH:mm");
        const investmentstock = await Invest.find({category:"stocks"});
        const investmentcrypto = await Invest.find({category:"crypto"});
        console.log("stock invests total:", investmentstock.length);
        console.log("crypto invests total:", investmentcrypto.length);
        /*if (
          date == moment.utc().format(`${month}-${day} 20:31`) &&
          investmentstock.length !== 0
        ){
          //set open price
          //should be 20:31
        }
      
        
        
        */
        
         


        if (
          date == moment.utc().format(`${month}-${day} 15:47`) &&
          investmentstock.length !== 0 
        ) {
          Stock.find({}, (error, highest) => {
            if(error){
              console.log(error)
            }
            if(highest[0].return==0){
              stockPrice((error, highest) => {
                if (error) {
                  return console.log(error);
                }
              });
            }
          }).sort({return:-1}).limit(1);
        }
        if (
          date == moment.utc().format(`${month}-${day} 15:47`) &&
          investmentcrypto.length !== 0 
        ) {
          Crypto.find({}, (error, highest) => {
            if(error){
              console.log(error)
            }
            if(highest[0].return==0){
              cryptoPrice((error, highest) => {
                if (error) {
                  return console.log(error);
                }
              });
            }
          }).sort({return:-1}).limit(1);
        }
        setTimeout(checkReturn, 1000 * 10);
      };
      checkReturn();
      
}
    
      
