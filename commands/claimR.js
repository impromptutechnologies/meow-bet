const Bet = require("../models/betSchema");
const Invest = require("../models/investSchema");
const Profile = require("../models/profileSchema");

module.exports = {
  name: "claim",
  cooldown: 1,
  description: "Claim Winnings!",
  execute(client, message, args, Discord, profileData) {
    if (message.guild === null) {
      return message.author.send(
        "This particular command must be placed in a server"
      );
    }
    try {
      Bet.find(
        {
          creatorID: message.author.id, status: "won" 
        },
        (err, bet) => {
          if (err) {
            return console.log(err);
          }
          if (bet[0] == null) {
            return message.channel.send("No Unclaimed Bet Winnings.");
          }
          Bet.aggregate([
            { $match: { creatorID: message.author.id, status: "won" }},
            { $group: { _id: null, wonamount: { $sum: "$possibleWinnings" }, betamount: { $sum: "$betAmount" } } }
            ], (err, res) => {
            Profile.findOneAndUpdate(
              { userID: message.author.id },
              {
                $inc: {
                  returntokens: (res[0].wonamount - (res[0].wonamount * 0.05)),
                  tokens: res[0].wonamount - (res[0].wonamount * 0.05),
                  bettokens: res[0].betamount,
                },
              },
              (err, user) => {
              });
          })
          bet.forEach((bet) => {
            const creatorID = bet.creatorID;
            const guildID = bet.serverID;
            const betAmount = bet.betAmount;
            const yourWinnings = bet.possibleWinnings;
                if (err) {
                  return console.log(err);
                }
                  const newEmbed = new Discord.MessageEmbed()
                    .setColor("#304281")
                    .setTitle(`Good Bet on ${bet.Code}!`)
                    .setAuthor(
                      message.author.username,
                      message.author.displayAvatarURL({
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
                    .setFooter("visit https://getmeow.gg/bets to view bets!")
                    .setURL("https://getmeow.gg/bets");
                  message.channel.send(newEmbed);
                  Bet.deleteOne(
                    {
                      creatorID: creatorID,
                      _id: bet._id,
                      status: "won",
                    },
                    (error, deleted) => {
                      if (error) {
                        console.log(error);
                      }
                    }
                  );

            /*Profile.findOneAndUpdate(
              { userID: client.guilds.cache.get(guildID).ownerID },
              { $inc: { tokens: yourWinnings * 0.05 } },
              (err, user) => {
                if (err) {
                  return console.log(err);
                }
              }
            );*/
          });
        }
      ).lean();

      Invest.find(
        {
          creatorID: message.author.id, status: "won"
        },
        (err, invest) => {
          if (err) {
            return console.log(err);
          }
          if (invest[0] == null) {
            return message.channel.send("No Unclaimed Investment Winnings.");
          }
          Invest.aggregate([
            { $match: { creatorID: message.author.id, status: "won" }},
            { $group: { _id: null, betamount: { $sum: "$investAmount" } } }
            ], (err, res) => {
            const wonamount = res[0].betamount * 3;
            Profile.findOneAndUpdate(
              { userID: message.author.id },
              {
                $inc: {
                  returntokens: (wonamount - (wonamount * 0.05)),
                  tokens: (wonamount - (wonamount * 0.05)),
                  bettokens: res[0].betamount,
                },
              },
              (err, user) => {
            });
          })
          invest.forEach((invest) => {
            const creatorID = invest.creatorID;
            const guildID = invest.serverID;
            const betAmount = invest.investAmount;
            const yourWinnings = betAmount * 3;
                if (err) {
                  return console.log(err);
                }

                  const newEmbed = new Discord.MessageEmbed()
                    .setColor("#304281")
                    .setTitle(`Good Bet on ${invest.Code}!`)
                    .setAuthor(
                      message.author.username,
                      message.author.displayAvatarURL({
                        format: "png",
                        dynamic: true,
                      })
                    )
                    .addFields(
                      {
                        name: "Invest Amount",
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
                      "visit https://getmeow.gg/betsst to view more stocks!"
                    )
                    .setURL("https://getmeow.gg/betsst");
                  message.channel.send(newEmbed);
                  Invest.deleteOne(
                    {
                      creatorID: creatorID,
                      _id: invest._id,
                      status: "won",
                    },
                    (error, deleted) => {
                      if (error) {
                        console.log(error);
                      }
                    }
                  );

            /*Profile.findOneAndUpdate(
              { userID: client.guilds.cache.get(guildID).ownerID },
              { $inc: { tokens: yourWinnings * 0.05 } },
              (err, user) => {
                if (err) {
                  return console.log(err);
                }
              }
            );*/
            
          });
        }
      ).lean();
    } catch (err) {
      console.log(err, "heuy");
    }
  },
};



/*










const Bet = require("../models/betSchema");
const Invest = require("../models/investSchema");
const Profile = require("../models/profileSchema");

module.exports = {
  name: "claim",
  cooldown: 1,
  description: "Claim Winnings!",
  execute(client, message, args, Discord, profileData) {
    console.time('start');
    try {
      Bet.find(
        {
          creatorID: message.author.id, status: "won" 
        },
        (err, bet) => {
          if (err) {
            return console.log(err);
          }
          if (bet[0] == null) {
            return message.channel.send("No Unclaimed Bet Winnings.");
          }
          bet.forEach((bet) => {
            const creatorID = bet.creatorID;
            const guildID = bet.serverID;
            const betAmount = bet.betAmount;
            const yourWinnings = bet.possibleWinnings;
            Profile.findOneAndUpdate(
              { userID: message.author.id },
              {
                $inc: {
                  returntokens: (yourWinnings - yourWinnings * 0.05)-betAmount,
                  tokens: yourWinnings - yourWinnings * 0.05,
                },
              },
              (err, user) => {
                if (err) {
                  return console.log(err);
                }
                const embedUser = client.users.fetch(user.userID);
                embedUser.then(function (result1) {
                  const newEmbed = new Discord.MessageEmbed()
                    .setColor("#304281")
                    .setTitle(`Good Bet on ${bet.Code}!`)
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
                    .setFooter("visit https://getmeow.gg/bets to view bets!")
                    .setURL("https://getmeow.gg/bets");
                  message.channel.send(newEmbed);
                  Bet.deleteOne(
                    {
                      creatorID: creatorID,
                      _id: bet._id,
                      status: "won",
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
              { $inc: { tokens: yourWinnings * 0.05 } },
              (err, user) => {
                if (err) {
                  return console.log(err);
                }
              }
            );
          });
        }
      ).lean();

      Invest.find(
        {
          creatorID: message.author.id, status: "won"
        },
        (err, invest) => {
          if (err) {
            return console.log(err);
          }
          if (invest[0] == null) {
            return message.channel.send("No Unclaimed Investment Winnings.");
          }
          invest.forEach((invest) => {
            const creatorID = invest.creatorID;
            const guildID = invest.serverID;
            const betAmount = invest.investAmount;
            const yourWinnings = betAmount * 3;
            Profile.findOneAndUpdate(
              { userID: message.author.id },
              {
                $inc: {
                  returntokens: ((yourWinnings - yourWinnings * 0.05)-betAmount),
                  tokens: yourWinnings - yourWinnings * 0.05,
                },
              },
              (err, user) => {
                if (err) {
                  return console.log(err);
                }
                const embedUser = client.users.fetch(user.userID);
                embedUser.then(function (result1) {
                  const newEmbed = new Discord.MessageEmbed()
                    .setColor("#304281")
                    .setTitle(`Good Bet on ${bet.Code}!`)
                    .setAuthor(
                      result1.username,
                      result1.displayAvatarURL({
                        format: "png",
                        dynamic: true,
                      })
                    )
                    .addFields(
                      {
                        name: "Invest Amount",
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
                      "visit https://getmeow.gg/betsst to view more stocks!"
                    )
                    .setURL("https://getmeow.gg/betsst");
                  message.channel.send(newEmbed);
                  Invest.deleteOne(
                    {
                      creatorID: creatorID,
                      _id: invest._id,
                      status: "won",
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
              { $inc: { tokens: yourWinnings * 0.05 } },
              (err, user) => {
                if (err) {
                  return console.log(err);
                }
              }
            );
          });
        }
      ).lean();
    } catch (err) {
      console.log(err, "heuy");
    }
    console.timeEnd('start');
  },
};*/
