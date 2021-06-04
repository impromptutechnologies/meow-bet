//Make sure you update the the profile find one and update for Codes1 and Codes2


var request = require("request");
const Outcome = require("../models/outcomeSchema");
const Bet = require("../models/betSchema");
const Profile = require("../models/profileSchema");

const moment = require("moment-timezone");

const betResult = (id, Discord, client) => {
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
          console.log(data);
          if (error) throw new Error(error);

          if (
            data.response[0].fixture.status.short == "FT" ||
            data.response[0].fixture.status.short == "ET"
          ) {
            const team1 = data.response[0].teams.home.name;
            const team2 = data.response[0].teams.away.name;
            const team1goals = data.response[0].score.fulltime.home;
            const team2goals = data.response[0].score.fulltime.away;
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
            if (data.response[0].teams.home.winner == true) {
              console.log(code1);
              Bet.find({ Code: code1 }, (err, successes) => {
                console.log(successes);
                successes.forEach((success) => {
                  const creatorID = success.creatorID;
                  const guildID = success.serverID;
                  const betAmount = success.betAmount;
                  const channelID = success.channelID;
                  const yourWinnings = success.possibleWinnings;
                  Profile.findOneAndUpdate(
                    { userID: creatorID },
                    { $inc: { coins: (yourWinnings-(yourWinnings*0.05)) } },
                    (err, user) => {
                      if (err) {
                        return console.log(err);
                      }
                      const embedUser = client.users.fetch(user.userID);
                      embedUser.then(function (result1) {
                        console.log(team1, team2);
                        const newEmbed = new Discord.MessageEmbed()
                          .setColor("#304281")
                          .setTitle(`Good Bet on ${team1}!`)
                          .setDescription(
                            `${team1} beat ${team2}, (${team1goals}:${team2goals}) !`
                          )
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
                          }
                        );
                      });
                    }
                  );

                  Profile.findOneAndUpdate(
                    { userID: client.guilds.cache.get(guildID).ownerID },
                    { $inc: { coins: (yourWinnings*0.05) } },
                    (err, user) => {
                      if (err) {
                        return console.log(err);
                      }
                    }
                  );
                });
              });
              Bet.deleteMany(
                {
                  $or: [{ Code: code2 }, { Code: code3 }],
                },
                (error, deleted) => {
                  if (error) {
                    console.log(error);
                  }
                }
              );
            }
            if (data.response[0].teams.away.winner == true) {
              console.log(code2);
              Bet.find({ Code: code2 }, (err, successes) => {
                successes.forEach((success) => {
                  const guildID = success.serverID;
                  const creatorID = success.creatorID;
                  console.log(successes);
                  Profile.findOne({ userID: creatorID }, (err, profile) => {
                    const coinz = profile.coins;
                    const betAmount = success.betAmount;
                    const channelID = success.channelID;
                    if (profile) {
                      const yourWinnings = success.possibleWinnings;
                      Profile.findOneAndUpdate(
                        { userID: creatorID },
                        { coins: (yourWinnings-(yourWinnings*0.05)) + coinz },
                        (err, user) => {
                          if (err) {
                            return console.log(err);
                          }
                          const embedUser = client.users.fetch(user.userID);
                          embedUser.then(function (result1) {
                            console.log(team1, team2);
                            const newEmbed = new Discord.MessageEmbed()
                              .setColor("#304281")
                              .setTitle(`Good Bet on ${team2}!`)
                              .setDescription(
                                `${team2} beat ${team1}, (${team2goals}:${team1goals})!`
                              )
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
                              }
                            );
                          });
                        }
                      );

                      Profile.findOneAndUpdate(
                        { userID: client.guilds.cache.get(guildID).ownerID },
                        { $inc: { coins: (yourWinnings*0.05) } },
                        (err, user) => {
                          if (err) {
                            return console.log(err);
                          }
                        }
                      );
                    }
                  });
                });
              });
              Bet.deleteMany(
                {
                  $or: [{ Code: code1 }, { Code: code3 }],
                },
                (error, deleted) => {
                  if (error) {
                    console.log(error);
                  }
                }
              );
            } else {
              Bet.find({ Code: code3 }, (err, successes) => {
                successes.forEach((success) => {
                  const guildID = success.serverID;
                  const creatorID = success.creatorID;
                  console.log(successes);
                  Profile.findOne({ userID: creatorID }, (err, profile) => {
                    const coinz = profile.coins;
                    const betAmount = success.betAmount;
                    const channelID = success.channelID;
                    if (profile) {
                      const yourWinnings = success.possibleWinnings;
                      Profile.findOneAndUpdate(
                        { userID: creatorID },
                        { coins: (yourWinnings-(yourWinnings*0.05)) + coinz },
                        (err, user) => {
                          if (err) {
                            return console.log(err);
                          }
                          const embedUser = client.users.fetch(user.userID);
                          embedUser.then(function (result1) {
                            const newEmbed = new Discord.MessageEmbed()
                              .setColor("#304281")
                              .setTitle(`Good Bet on a draw!`)
                              .setDescription(
                                `${team1} and ${team2} drew, (${team1goals}:${team2goals})!`
                              )
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
                              }
                            );
                          });
                        }
                      );
                    }
                  });

                  Profile.findOneAndUpdate(
                    { userID: client.guilds.cache.get(guildID).ownerID },
                    { $inc: { coins: yourWinnings } },
                    (err, user) => {
                      if (err) {
                        return console.log(err);
                      }
                    }
                  );
                });
              });
              Bet.deleteMany(
                {
                  $or: [{ Code: code2 }, { Code: code1 }],
                },
                (error, deleted) => {
                  if (error) {
                    console.log(error);
                  }
                }
              );
            }
          } else {
            console.log("game still in progress");
          }
        });
      }
    }
  );
};

module.exports = betResult;
