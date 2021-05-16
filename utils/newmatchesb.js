var request = require("request");
const Outcome = require("../models/outcomeSchema");
const moment = require("moment-timezone");
const setOddsB = require("../utils/setOddsB");

const newMatchesBasketball = () => {
    var day = moment.utc().format("DD");
        var month = moment.utc().format("MM");
        var year = moment.utc().format("YYYY");
        var date = moment.utc().format("MM-DD HH:mm");
      const options = {
        method: "GET",
        url: "https://v1.basketball.api-sports.io/games",
        qs: {
          league: 12,
          season: "2020-2021",
          date: `${year}-${month}-${day}`,
        },
        headers: {
          "x-rapidapi-host": "v1.basketball.api-sports.io",
          "x-rapidapi-key": "e40fc324e790e08e5f948456fd4d1049",
        },
      };
      request(options, (error, response, body) => {
        data = JSON.parse(body);
        if (error) throw new Error(error);
        data.response.forEach((element)=>{
          console.log(element.date, element.teams.home.name);
          if(element.status.long == 'Not Started'){
            Outcome.create(
              {
                outcomeID: element.id,
                category: "basketball",
                team1: element.teams.home.name,
                team2: element.teams.away.name,
                timeStart: moment
                  .utc(element.date)
                  .format("MM-DD HH:mm"),
                timeEnd: moment
                  .utc(element.date)
                  .add(3, "hours")
                  .format("MM-DD HH:mm"),
              },
              (err, res) => {
                if(err){
                  console.log(err)
                }
                res.save();
              }
            );
          }
            
  
        })
        
  
  
      });
      setTimeout(setOddsB, 10000)
    
  };

  module.exports = newMatchesBasketball;