
var request = require("request");
const Outcome = require("../models/outcomeSchema");
const Bet = require("../models/betSchema");
const Profile = require("../models/profileSchema");

const moment = require("moment-timezone");

const betResultEsports = (id, Discord, client, option) => {
    const exists = Bet.find(
        {
          outcomeID: id,
        },
        (err, outcomeData) => {
          if (outcomeData.length == 0) {
            return console.log("no bets placed");
          } else {
            console.log(option)
            request(option, (error, response, body) => {
              data = JSON.parse(body);
              if (error) throw new Error(error);
              if (data[0].status == "finished") {
                team1 = data[0].opponents[0].opponent.name;
                team2 = data[0].opponents[1].opponent.name;
                team1points = data[0].results[0].score;
                team2points = data[0].results[1].score;
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
                  console.log(code1, code2)
                if (data[0].winner_id == data[0].opponents[0].opponent.id) {
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
                                  .setTitle(`Good Bet on ${team1}!`)
                                  .setDescription(`${team1} beat ${team2}, (${team1points}:${team2points}) !`)
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
                    }
                  });
                }
                else {
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
                                  .setTitle(`Good Bet on ${team2}!`)
                                  .setDescription(`${team2} beat ${team1}, (${team2points}:${team1points}) !`)
                                  
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


module.exports = betResultEsports;

















