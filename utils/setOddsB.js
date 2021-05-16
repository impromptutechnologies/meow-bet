const Outcome = require("../models/outcomeSchema");

const setOddsB = () => {
  var request = require("request");

  Outcome.find(
    {
      category: "basketball",
    },
    (err, res) => {
      if (err) {
        console.log(err);
      }
      for (const element of res) {
        if (element.option1.length == 0) {
          console.log(element);
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

            if (!data.response[0]) {
              const code1 = `${element.team1
                .substring(0, 3)
                .replace(/\s+/g, "")
                .toUpperCase()}${element.team2
                .substring(0, 3)
                .replace(/\s+/g, "")
                .toUpperCase()}1`;
              const code3 = `${element.team1
                .substring(0, 3)
                .replace(/\s+/g, "")
                .toUpperCase()}${element.team2
                .substring(0, 3)
                .replace(/\s+/g, "")
                .toUpperCase()}2`;
              element.addOptions([
                code1,
                0.0,
                /*code2,
                parseFloat(data.response[0].bookmakers[0].bets[0].values[2].odd),*/
                code3,
                0.0,
              ]);
              element.save();
            } else {
              const code1 = `${element.team1
                .substring(0, 3)
                .replace(/\s+/g, "")
                .toUpperCase()}${element.team2
                .substring(0, 3)
                .replace(/\s+/g, "")
                .toUpperCase()}1`;
              const code3 = `${element.team1
                .substring(0, 3)
                .replace(/\s+/g, "")
                .toUpperCase()}${element.team2
                .substring(0, 3)
                .replace(/\s+/g, "")
                .toUpperCase()}2`;
              element.addOptions([
                code1,
                parseFloat(
                  data.response[0].bookmakers[0].bets[0].values[0].odd
                ),
                /*code2,
                parseFloat(data.response[0].bookmakers[0].bets[0].values[2].odd),*/
                code3,
                parseFloat(
                  data.response[0].bookmakers[0].bets[0].values[1].odd
                ),
              ]);
              element.save();
            }
          });
        }
      }
    }
  );
};

module.exports = setOddsB;