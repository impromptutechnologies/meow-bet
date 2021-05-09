var request = require("request");
const Outcome = require("../models/outcomeSchema");
const moment = require("moment-timezone");

const team_id = [
  "40", //liv
  "33", //utd
  "47", //tot
  "49", //chel
  "50", //PSG
  "541", //Real
  "42",
];

const newMatchesSoccer = () => {

    var date = moment.utc().format("YYYY-MM-DD");
      const options = {
        method: "GET",
        url: "https://v3.football.api-sports.io/fixtures",
        qs: {
          league: 39,
          date: date,
          season: 2020
        },
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "e40fc324e790e08e5f948456fd4d1049",
        },
      };
      request(options, (error, response, body) => {
        data = JSON.parse(body);
        console.log(data);
        if (error) throw new Error(error);
        for (const element of data.response) {
          console.log(element.fixture.date)
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
              const code1 = (`${res.team1.substring(0,3).replace(/\s+/g, '').toUpperCase()}${res.team2.substring(0,3).replace(/\s+/g, '').toUpperCase()}1`)
              const code2 = (`${res.team1.substring(0,3).replace(/\s+/g, '').toUpperCase()}${res.team2.substring(0,3).replace(/\s+/g, '').toUpperCase()}2`)
              const code3 = (`${res.team1.substring(0,3).replace(/\s+/g, '').toUpperCase()}${res.team2.substring(0,3).replace(/\s+/g, '').toUpperCase()}3`) 
              res.addOptions([
                code1,
                1.3,
                code2,
                1.5,
                code3,
                2.1,
              ]);
              res.save();
            }
          );
        }
        
      });

  
};


module.exports = newMatchesSoccer;

/*
//mancity
  /*"85",//PSG
  "157",//bayern
  "496",//juve
  "529",//barca
  "541",//Real
  85 psg/*
  "165",//dort
  "42",//Arsenal
  const element of team_id
      Outcome.create(
              {
                outcomeID: data.response[0].fixture.id,
                category: "soccer",
                team1: data.response[0].teams.home.name,
                team2: data.response[0].teams.away.name,
                timeStart: moment
                  .utc(data.response[0].fixture.date)
                  .format("MM-DD HH:mm"),
                timeEnd: moment
                  .utc(data.response[0].fixture.date).add(2, "hours")
                  .format("MM-DD HH:mm")
              },
              (err, res) => {
                if (err) {
                  return console.log(err);
                }
                res.addOptions([
                  "LEISOU1",
                  1.3,
                  "LEISOU2",
                  1.5,
                  "LEISOU3",
                  2.1,
                ]);
                res.save()
              }
            );*/
