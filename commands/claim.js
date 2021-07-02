const Bet = require("../models/betSchema");
const Invest = require("../models/investSchema");
const Profile = require("../models/profileSchema");

module.exports = {
  name: "claim",
  cooldown: 1,
  description: "Claim Winnings!",
  execute(client, message, args, Discord, profileData) {
    try {
      Bet.find(
        {
          $and: [{ creatorID: message.author.id }, { status: "won" }],
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
                  coins: yourWinnings - yourWinnings * 0.05,
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
                      outcomeID: bet.outcomeID,
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
              { $inc: { coins: yourWinnings * 0.05 } },
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
          $and: [{ creatorID: message.author.id }, { status: "won" }],
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
                  coins: yourWinnings - yourWinnings * 0.05,
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
                      outcomeID: invest.outcomeID,
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
              { $inc: { coins: yourWinnings * 0.05 } },
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
  },
};
