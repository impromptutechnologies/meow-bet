const Outcome = require("../../models/outcomeSchema");
const Invest = require("../../models/investSchema");
const Stock = require("../../models/stockSchema");
const Crypto = require("../../models/cryptoSchema");
const moment = require("moment-timezone");
const schedule = require('node-schedule')


module.exports = async (Discord, client) => {
  client.user.setPresence({
    status: "online",  //You can show online, idle....
    activity: {
        name: "!help",  //The message shown
        type: "PLAYING" //PLAYING: WATCHING: LISTENING: STREAMING:
    } 
  });
};







































  




  /*const newMatches = async () => {
    //newMatchesEsports();
    newMatchesBasketball("1");
    newMatchesBasketball("2");
    newMatchesBasketball("3");
    //newMatchesSoccer("euros");
    //setTimeout(newMatchesBasketball.bind(null, '2'), 60000)
    //setTimeout(newMatchesBasketball.bind(null, '3'), 120000)
    //setTimeout(newMatchesSoccer.bind(null, 'prem'), 60000)
    //setTimeout(newMatchesSoccer.bind(null, 'champ'), 120000)
    //setTimeout(newMatchesSoccer.bind(null, 'seriea'), 180000)
    //setTimeout(newMatchesSoccer.bind(null, 'euros'), 180000)
  }*/
 //schedule.scheduleJob('0 */6 * * *', ()=>{
    //newMatches();
  //})






/*const checkOdds = async () => {
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
}*/
//schedule.scheduleJob('55 */1 * * *', ()=>{
  //checkOdds();
//})

  




