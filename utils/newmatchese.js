var request = require("request");
const Outcome = require("../models/outcomeSchema");
const moment = require("moment-timezone");

const newMatchesEsports = () => {
  
    var day = moment.utc().format("DD");
        var month = moment.utc().format("MM");
        var date = moment.utc().format("MM-DD HH:mm");
        const request = require('request');

        const options = {
          method: 'GET',
          url: 'https://api.pandascore.co/codmw/matches/upcoming?filter[videogame]=cod-mw',
          headers: {
            'Authorization': 'Bearer hCHqW_AKX0xtmdSF5ZACti9M9LcLsWKKa52M70hWWy7aGEaql5M',
            'host': 'api.pandascore.co',
            useQueryString: true
          }
        };
        
      request(options, (error, response, body) => {
        data = JSON.parse(body);
        if (error) throw new Error(error);
        data.forEach((element) => {
          if(!(element.opponents.length == 0)){
            if(!(moment
              .utc(element.begin_at)
              .format("MM-DD HH:mm") < date)){
                  console.log(element.begin_at)
                  Outcome.create(
                    {
                      outcomeID: element.id,
                      category: "esports",
                      team1: element.opponents[0].opponent.acronym,
                      team2: element.opponents[1].opponent.acronym,
                      timeStart: moment
                        .utc(element.begin_at)
                        .format("MM-DD HH:mm"),
                      timeEnd: moment
                        .utc(element.begin_at)
                        .add(1, "hours")
                        .format("MM-DD HH:mm"),
                    },
                    (err, res) => {
                      if(err){
                        console.log(err)
                      }
                      const code1 = (`${element.opponents[0].opponent.acronym.substring(0,3).replace(/\s+/g, '').toUpperCase()}${element.opponents[1].opponent.acronym.substring(0,3).replace(/\s+/g, '').toUpperCase()}1`)
                      const code2 = (`${element.opponents[0].opponent.acronym.substring(0,3).replace(/\s+/g, '').toUpperCase()}${element.opponents[1].opponent.acronym.substring(0,3).replace(/\s+/g, '').toUpperCase()}2`)
                      res.addOptions([
                        code1,
                        1.3,
                        code2,
                        1.5,
                      ]);
                      res.save();
                    }
                  );
              }
          }
        })
        
  
      });
    
  };

  module.exports = newMatchesEsports;
