//get an id and check if the match is completed, and return the result...

var request = require("request");
const Outcome = require("../models/outcomeSchema");
const Bet = require("../models/betSchema");
const Profile = require("../models/profileSchema");

const moment = require("moment-timezone");

const betResult = (id, Discord, client) => {
  console.log(client.users)
  const exists = Bet.find(
    {
      outcomeID: id,
    },
    (err, outcomeData) => {
      if (outcomeData.length == 0) {
        return console.log("no bets placed");
      } else {
        const options = {
          method: "GET",
          url: "https://v3.football.api-sports.io/fixtures",
          qs: {
            id: id,
          },
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "e40fc324e790e08e5f948456fd4d1049",
          },
        };
        request(options, (error, response, body) => {
          data = JSON.parse(body);
          console.log(data.response[0].fixture.status);
          if (error) throw new Error(error);

          if (data.response[0].fixture.status.short == "FT") {
            console.log(
              "home",
              data.response[0].teams.home.name,
              data.response[0].teams.home.winner
            );
            console.log(
              "away",
              data.response[0].teams.away.name,
              data.response[0].teams.away.winner
            );
            team1 = data.response[0].teams.home.name;
            team2 = data.response[0].teams.away.name;
            const code1 = `${team1
              .substring(0, 3)
              .replace(/\s+/g, "")
              .toUpperCase()}${team2
              .substring(0, 3)
              .replace(/\s+/g, "")
              .toUpperCase()}1`;
            const code2 = `${team1
              .substring(0, 3)
              .replace(/\s+/g, "")
              .toUpperCase()}${team2
              .substring(0, 3)
              .replace(/\s+/g, "")
              .toUpperCase()}2`;
            const code3 = `${team1
              .substring(0, 3)
              .replace(/\s+/g, "")
              .toUpperCase()}${team2
              .substring(0, 3)
              .replace(/\s+/g, "")
              .toUpperCase()}3`;
              console.log(code1, code2, code3)
            if (data.response[0].teams.home.winner == true) {
                console.log(code1)
              Bet.find({ Code: code1 }, (err, successes) => {
                for (const success of successes) {
                  const creatorID = success.creatorID;
                  console.log(successes);
                  Profile.findOne({ userID: creatorID }, (err, profile) => {
                    const coinz = profile.coins;
                    const betAmount = success.betAmount;
                    const channelID = success.channelID;
                    if (profile) {
                      const yourWinnings = success.betOdds * betAmount;
                      Profile.findOneAndUpdate(
                        { userID: creatorID },
                        { coins: yourWinnings + coinz },
                        (err, user) => {
                          if (err) {
                            return console.log(err);
                          }
                          const embedUser = client.users.fetch(user.userID);
                          embedUser.then(function (result1) {
                            const newEmbed = new Discord.MessageEmbed()
                              .setColor("#304281")
                              .setTitle(`Good Bet!`)
                              .setAuthor(
                                result1.username,
                                result1.displayAvatarURL({
                                  format: "png",
                                  dynamic: true,
                                })
                              )
                              .addFields(
                                {
                                  name: "Bet Amount",
                                  value: betAmount,
                                },
                                {
                                  name: "Winnings",
                                  value: yourWinnings.toFixed(2),
                                },
                                {
                                  name: "Profit",
                                  value: (yourWinnings - betAmount).toFixed(2),
                                }
                              )
                              .setFooter(
                                "visit http://localhost:3000/bets to view bets!"
                              )
                              .setURL("http://localhost:3000/bets");
                            client.channels.cache.get(channelID).send(newEmbed);
                            Bet.deleteMany(
                              {
                                creatorID: creatorID,
                                outcomeID: success.outcomeID,
                              },
                              (error, deleted) => {
                                if (error) {
                                  console.log(error);
                                }
                                console.log("deleted");
                              }
                            );
                          });
                        }
                      );
                    }
                  });
                }
              });
            }
            if (data.response[0].teams.away.winner == true) {
                console.log(code3)
              Bet.find({ Code: code3 }, (err, successes) => {
                for (const success of successes) {
                  const creatorID = success.creatorID;
                  console.log(successes);
                  Profile.findOne({ userID: creatorID }, (err, profile) => {
                    const coinz = profile.coins;
                    const betAmount = success.betAmount;
                    const channelID = success.channelID;
                    if (profile) {
                      const yourWinnings = success.betOdds * betAmount;
                      Profile.findOneAndUpdate(
                        { userID: creatorID },
                        { coins: yourWinnings + coinz },
                        (err, user) => {
                          if (err) {
                            return console.log(err);
                          }
                          const embedUser = client.users.fetch(user.userID);
                          embedUser.then(function (result1) {
                            const newEmbed = new Discord.MessageEmbed()
                              .setColor("#304281")
                              .setTitle(`Good Bet!`)
                              .setAuthor(
                                result1.username,
                                result1.displayAvatarURL({
                                  format: "png",
                                  dynamic: true,
                                })
                              )
                              .addFields(
                                {
                                  name: "Bet Amount",
                                  value: betAmount,
                                },
                                {
                                  name: "Winnings",
                                  value: yourWinnings.toFixed(2),
                                },
                                {
                                  name: "Profit",
                                  value: (yourWinnings - betAmount).toFixed(2),
                                }
                              )
                              .setFooter(
                                "visit http://localhost:3000/bets to view bets!"
                              )
                              .setURL("http://localhost:3000/bets");
                            client.channels.cache.get(channelID).send(newEmbed);
                            Bet.deleteMany(
                              {
                                creatorID: creatorID,
                                outcomeID: success.outcomeID,
                              },
                              (error, deleted) => {
                                if (error) {
                                  console.log(error);
                                }
                                console.log("deleted");
                              }
                            );
                          });
                        }
                      );
                    }
                  });
                }
              });
            } else {
              Bet.find({ Code: code2 }, (err, successes) => {
                for (const success of successes) {
                  const creatorID = success.creatorID;
                  console.log(successes);
                  Profile.findOne({ userID: creatorID }, (err, profile) => {
                    const coinz = profile.coins;
                    const betAmount = success.betAmount;
                    const channelID = success.channelID;
                    if (profile) {
                      const yourWinnings = success.betOdds * betAmount;
                      Profile.findOneAndUpdate(
                        { userID: creatorID },
                        { coins: yourWinnings + coinz },
                        (err, user) => {
                          if (err) {
                            return console.log(err);
                          }
                          const embedUser = client.users.fetch(user.userID);
                          embedUser.then(function (result1) {
                            const newEmbed = new Discord.MessageEmbed()
                              .setColor("#304281")
                              .setTitle(`Good Bet!`)
                              .setAuthor(
                                result1.username,
                                result1.displayAvatarURL({
                                  format: "png",
                                  dynamic: true,
                                })
                              )
                              .addFields(
                                {
                                  name: "Bet Amount",
                                  value: betAmount,
                                },
                                {
                                  name: "Winnings",
                                  value: yourWinnings.toFixed(2),
                                },
                                {
                                  name: "Profit",
                                  value: (yourWinnings - betAmount).toFixed(2),
                                }
                              )
                              .setFooter(
                                "visit http://localhost:3000/bets to view bets!"
                              )
                              .setURL("http://localhost:3000/bets");
                            client.channels.cache.get(channelID).send(newEmbed);
                            Bet.deleteMany(
                              {
                                creatorID: creatorID,
                                outcomeID: success.outcomeID,
                              },
                              (error, deleted) => {
                                if (error) {
                                  console.log(error);
                                }
                                console.log("deleted");
                              }
                            );
                          });
                        }
                      );
                    }
                  });
                }
              });
            }
          } else {
            console.log("game still in progress");
          }
        });
      }
    }
  );
};

/*const betResultBasketball = (id) => {
    const options = {
        method: "GET",
        url: "https://v1.basketball.api-sports.io/games",
        qs: {
          league: 12,
          season: "2020-2021",
          date: `2021-${month}-${day}`,
        },
        headers: {
          "x-rapidapi-host": "v1.basketball.api-sports.io",
          "x-rapidapi-key": "e40fc324e790e08e5f948456fd4d1049",
        },
    };
    request(options, (error, response, body) => {
      data = JSON.parse(body);
      console.log("home", data.response[0].teams.home.winner);
      console.log("away", data.response[0].teams.away.winner);
      if (error) throw new Error(error);

      
    });
};

const betResultEsports = (id) => {
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
      console.log("home", data.response[0].teams.home.winner);
      console.log("away", data.response[0].teams.away.winner);
      if (error) throw new Error(error);
        
    });
};*/

module.exports = betResult;
/*module.exports = betResultBasketball;
module.exports = betResultEsports;*/
