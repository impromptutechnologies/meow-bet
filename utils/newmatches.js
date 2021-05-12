var request = require("request");
const Outcome = require("../models/outcomeSchema");
const moment = require("moment-timezone");
const setOdds = require("../utils/setodds");

const newMatchesSoccer = () => {

    var date = moment.utc().format("YYYY-MM-DD");
    var date1 = moment.utc(date).add(2, "days").format("YYYY-MM-DD")
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
      request(options, (error, response, body) => {
        data = JSON.parse(body);
        if (error) throw new Error(error);
        for (const element of data.response) {
          Outcome.create(
            {
              outcomeID: element.fixture.id,
              category: "soccer",
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
              /*const code1 = (`${res.team1.substring(0,3).replace(/\s+/g, '').toUpperCase()}${res.team2.substring(0,3).replace(/\s+/g, '').toUpperCase()}1`)
              const code2 = (`${res.team1.substring(0,3).replace(/\s+/g, '').toUpperCase()}${res.team2.substring(0,3).replace(/\s+/g, '').toUpperCase()}2`)
              const code3 = (`${res.team1.substring(0,3).replace(/\s+/g, '').toUpperCase()}${res.team2.substring(0,3).replace(/\s+/g, '').toUpperCase()}3`) 
              res.addOptions([
                code1,
                1.3,
                code2,
                1.5,
                code3,
                2.1,
              ]);*/
              res.save();
            }
          );
        }
        
      });
      setTimeout(setOdds, 10000)

  
};


module.exports = newMatchesSoccer;
