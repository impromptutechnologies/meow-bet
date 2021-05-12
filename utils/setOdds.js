const Outcome = require("../models/outcomeSchema");

const setOdds = () => {
  var request = require("request");

  Outcome.find(
    {
      category: "soccer",
    },
    (err, res) => {
      if (err) {
        console.log(err);
      }
      for (const element of res) {
        var options = {
          method: "GET",
          url: "https://v3.football.api-sports.io/odds",
          qs: { bet: "1", bookmaker: "1", fixture: element.outcomeID },
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "e40fc324e790e08e5f948456fd4d1049",
          },
        };
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
          data = JSON.parse(body);
          console.log(
            "home =",
            data.response[0].bookmakers[0].bets[0].values[0],
            "draw =",
            data.response[0].bookmakers[0].bets[0].values[1],
            "away =",
            data.response[0].bookmakers[0].bets[0].values[2]
          );
          const code1 = `${element.team1
            .substring(0, 3)
            .replace(/\s+/g, "")
            .toUpperCase()}${element.team2
            .substring(0, 3)
            .replace(/\s+/g, "")
            .toUpperCase()}1`;
          const code2 = `${element.team1
            .substring(0, 3)
            .replace(/\s+/g, "")
            .toUpperCase()}${element.team2
            .substring(0, 3)
            .replace(/\s+/g, "")
            .toUpperCase()}2`;
          const code3 = `${element.team1
            .substring(0, 3)
            .replace(/\s+/g, "")
            .toUpperCase()}${element.team2
            .substring(0, 3)
            .replace(/\s+/g, "")
            .toUpperCase()}3`;
          element.addOptions([
            code1,
            parseFloat(data.response[0].bookmakers[0].bets[0].values[0].odd),
            code2,
            parseFloat(data.response[0].bookmakers[0].bets[0].values[2].odd),
            code3,
            parseFloat(data.response[0].bookmakers[0].bets[0].values[1].odd),
          ]);
          element.save();
        });
      }
    }
  );
};

module.exports = setOdds;
