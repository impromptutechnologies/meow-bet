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
const moment = require("moment-timezone");
const cryptoPriceOpen = require("../utils/cryptopriceopen");
const cryptoPrice = require("../utils/cryptoprice");
const betResultBasketball = require("../utils/betResultBasketball");
var request = require("request");
const setOdds = require("../utils/setOdds");

module.exports = {
  name: "testing",
  description: "testing testing 123",
  execute(client, message, args, Discord, profileData) {
    //newMatchesEsports();
    newMatchesBasketball('1')
    newMatchesBasketball('2')
    newMatchesBasketball('3')
    //newMatchesSoccer('laliga')
    //newMatchesSoccer('prem')
    //newMatchesSoccer('champ')
    //newMatchesSoccer('seriea')
  
    /*Outcome.find(
      {
        category: "soccer",
        option1: { $exists: true, $eq: [] },
      },
      (err, res) => {
        console.log(res);
        res.forEach((element) => {
          setOdds('euros', element.outcomeID);
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
    );*/
  
  },

};
















/*var date = moment.utc().format("YYYY-MM-DD");
    var date2 = moment.utc(date).add(1, "months").format("YYYY-MM-DD")
    var date1 = moment.utc(date).add(3, "days").add().format("YYYY-MM-DD")
    console.log(date1)
    const options = {
      method: "GET",
      url: "https://v3.football.api-sports.io/fixtures",
      qs: {
        league: 39,
        from: date,
        to:date1,
        season: 2020 
      },
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "e40fc324e790e08e5f948456fd4d1049",
      },
    };
    const optionsi = {
      method: "GET",
      url: "https://v3.football.api-sports.io/fixtures",
      qs: {
        league: 135,
        from: date,
        to:date1,
        season: 2020
      },
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "e40fc324e790e08e5f948456fd4d1049",
      },
    };
    const optionss = {
      method: "GET",
      url: "https://v3.football.api-sports.io/fixtures",
      qs: {
        league: 140,
        from: date,
        to:date1,
        season: 2020
      },
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "e40fc324e790e08e5f948456fd4d1049",
      },
    };


    const prem = () => {
      request(options, (error, response, body) => {
        datai = JSON.parse(body);
        if (error) throw new Error(error);
        console.log(datai)
        datai.response.forEach((element) => {
            Outcome.findOne({outcomeID: element.fixture.id}, (err, res) => {
              console.log(res);
              if(element.fixture.status.long == 'Not Started' && res == null
            
              &&
              (element.teams.home.name == 'Liverpool' || element.teams.home.name == 'Manchester United' || element.teams.home.name == 'Manchester City' || element.teams.home.name == 'Tottenham' || element.teams.home.name == 'Leicester'
              || element.teams.home.name == 'Arsenal' || element.teams.home.name == 'Chelsea' || element.teams.away.name == 'Liverpool' || element.teams.away.name == 'Manchester United' || element.teams.away.name == 'Manchester City' || element.teams.away.name == 'Tottenham' || element.teams.away.name == 'Leicester'
              || element.teams.home.name == 'Arsenal' || element.teams.home.name == 'Chelsea')
            ){
              Outcome.create(
                {
                  outcomeID: element.fixture.id,
                  category: "soccer",
                  league: "prem",
                  team1: element.teams.home.name,
                  team2: element.teams.away.name,
                  timeStart: moment
                    .utc(element.fixture.date)
                    .format("MM-DD HH:mm"),
                  timeEnd: moment
                    .utc(element.fixture.date)
                    .add(2, "hours")
                    .format("MM-DD HH:mm"),
                },
                (err, res) => {
                  if(err){
                    console.log(err)
                  }
                  res.save();
                  setOdds('prem', element.fixture.id)
                }
              );
              
            } else{
              console.log('element exists')
            }
         
              
            })
            
          });
      });
    }



    const seriea = () => {
      request(optionsi, (error, response, body) => {
        datai = JSON.parse(body);
        if (error) throw new Error(error);
        console.log(datai)
        datai.response.forEach((element) => {
            Outcome.findOne({outcomeID: element.fixture.id}, (err, res) => {
              console.log(res);
              if(element.fixture.status.long == 'Not Started' && res == null
              
              &&
              (element.teams.home.name == 'Juventus' || element.teams.home.name == 'Inter' || element.teams.home.name == 'AC Milan' || element.teams.home.name == 'Napoli' || element.teams.home.name == 'AS Roma' || 
              element.teams.away.name == 'Juventus' || element.teams.away.name == 'Inter' || element.teams.away.name == 'AC Milan' || element.teams.away.name == 'Napoli' || element.teams.away.name == 'AS Roma') 
              
              ){
              Outcome.create(
                {
                  outcomeID: element.fixture.id,
                  category: "soccer",
                  league: "rest",
                  spec:"seriea",
                  team1: element.teams.home.name,
                  team2: element.teams.away.name,
                  timeStart: moment
                    .utc(element.fixture.date)
                    .format("MM-DD HH:mm"),
                  timeEnd: moment
                    .utc(element.fixture.date)
                    .add(2, "hours")
                    .format("MM-DD HH:mm"),
                },
                (err, res) => {
                  if(err){
                    console.log(err)
                  }
                  res.save();
                  setOdds('rest', element.fixture.id)
                }
              );
              
            } else{
              console.log('element exists')
            }
         
              
            })
            
          });
      });
    }





    const laliga = () => {
      request(optionss, (error, response, body) => {
        datai = JSON.parse(body);
        if (error) throw new Error(error);
        console.log(datai)
        datai.response.forEach((element) => {
            Outcome.findOne({outcomeID: element.fixture.id}, (err, res) => {
              console.log(res);
              if(element.fixture.status.long == 'Not Started' && res == null
              &&
              (element.teams.home.name == 'Atletico Madrid' || element.teams.home.name == 'Real Madrid' || element.teams.home.name == 'Barcelona'
              || element.teams.away.name == 'Atletico Madrid' || element.teams.away.name == 'Real Madrid' || element.teams.away.name == 'Barcelona') 
              
              ){
              Outcome.create(
                {
                  outcomeID: element.fixture.id,
                  category: "soccer",
                  league: "rest",
                  spec:"laliga",
                  team1: element.teams.home.name,
                  team2: element.teams.away.name,
                  timeStart: moment
                    .utc(element.fixture.date)
                    .format("MM-DD HH:mm"),
                  timeEnd: moment
                    .utc(element.fixture.date)
                    .add(2, "hours")
                    .format("MM-DD HH:mm"),
                },
                (err, res) => {
                  if(err){
                    console.log(err)
                  }
                  res.save();
                  setOdds('rest', element.fixture.id)
                }
              );
              
            } else{
              console.log('element exists')
            }
         
              
            })
            
          });
      });
    }

    prem();
    setTimeout(laliga, 60000)
    setTimeout(seriea, 120000)


      
      

    











    //setting the odds after the matches are in place. 
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
