
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
            request(option, (error, response, body) => {
              data = JSON.parse(body);
              if (error) throw new Error(error);
              if (data[0].status == "finished") {
                const team1 = data[0].opponents[0].opponent.name;
                const team2 = data[0].opponents[1].opponent.name;
                const team1points = data[0].results[0].score;
                const team2points = data[0].results[1].score;
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

                if (data[0].winner_id == data[0].opponents[0].opponent.id) {
                    console.log(code1)

                  Bet.find({ Code: code1 }, (err, successes) => {
                    if(successes.length == 0){
                      console.log('no successes');
                      Bet.deleteMany(
                        {
                          $or: [{ Code: code2 }],
                        },
                        (error, deleted) => {
                          if (error) {
                            console.log(error);
                          }
                        }
                      );

                    }else{
                      successes.forEach((success) => {
                        const creatorID = success.creatorID;
                          const betAmount = success.betAmount;
                          const channelID = success.channelID;
                          const guildID = success.serverID;
                            const yourWinnings = success.possibleWinnings;
                            Profile.findOneAndUpdate(
                              { userID: creatorID },
                              { $inc: { coins: yourWinnings - (yourWinnings * 0.03) } },
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
                                      "visit https://getmeow.gg/bets to view bets!"
                                    )
                                    .setURL("https://getmeow.gg/bets");
                                  client.channels.cache.get(channelID).send(newEmbed);
                                  Profile.findOneAndUpdate(
                                    { userID: client.guilds.cache.get(guildID).ownerID },
                                    { $inc: { coins: yourWinnings * 0.03 } },
                                    (err, user) => {
                                      if (err) {
                                        return console.log(err);
                                      }
                                    }
                                  );
                                  Bet.deleteOne(
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
                        Bet.deleteMany(
                          {
                            $or: [{ Code: code2 }],
                          },
                          (error, deleted) => {
                            if (error) {
                              console.log(error);
                            }
                          }
                        );
                      });

                    }

                  });
                }
                else {
                  Bet.find({ Code: code2 }, (err, successes) => {
                    if(successes.length == 0){
                      Bet.deleteMany(
                        {
                          $or: [{ Code: code1 }],
                        },
                        (error, deleted) => {
                          if (error) {
                            console.log(error);
                          }
                        }
                      );

                    }else{
                      successes.forEach((success) => {                     
                        const creatorID = success.creatorID;
                          const betAmount = success.betAmount;
                          const channelID = success.channelID;
                          const guildID = success.serverID;
                            const yourWinnings = possibleWinnings;
                            Profile.findOneAndUpdate(
                              { userID: creatorID },
                              { $inc: { coins: yourWinnings - (yourWinnings * 0.03) } },
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
                                      "visit https://getmeow.gg/bets to view bets!"
                                    )
                                    .setURL("https://getmeow.gg/bets");
                                  client.channels.cache.get(channelID).send(newEmbed);
                                  Profile.findOneAndUpdate(
                                    { userID: client.guilds.cache.get(guildID).ownerID },
                                    { $inc: { coins: yourWinnings * 0.03 } },
                                    (err, user) => {
                                      if (err) {
                                        return console.log(err);
                                      }
                                    }
                                  );
                                  Bet.deleteOne(
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
                        Bet.deleteMany(
                          {
                            $or: [{ Code: code1 }],
                          },
                          (error, deleted) => {
                            if (error) {
                              console.log(error);
                            }
                          }
                        );
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


module.exports = betResultEsports;

















