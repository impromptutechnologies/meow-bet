const Bet = require("../models/betSchema");
const Outcome = require("../models/outcomeSchema");
const moment = require("moment-timezone");
const Profile = require("../models/profileSchema");

module.exports = {
  name: "bet",
  cooldown: 1,
  description: "Place a bet!",
  execute(client, message, args, Discord, profileData) {
    /*const checkForPosts = async () => {
      var day = moment.utc().format("DD");
      var month = moment.utc().format("MM");
      var date = moment.utc().format("MM-DD HH:mm");
      var date1 = moment.utc().format(`${month}-${day} 13:30`);
      var date2 = moment.utc().format(`${month}-${day} 20:00`);
      const bets = await Bet.find({ creatorID: message.author.id });
      console.log(bets.length);

      bets.forEach((bet) => {
        if (date == bet.timeEnd && bets.length !== 0) {
          Bet.findOne({
            $and: [
              { creatorID: message.author.id },
              { $or: [{ Code: bet.Code }, { Code2: bet.Code }, { Code3: bet.Code }] },
            ],
          }, (err, success) => {
              const creatorID = success.creatorID;
              console.log(success);

              //need to create a utils folder getting the results via an API call.
              Profile.findOne({ userID: creatorID }, (err, profile) => {
                const coinz = profile.coins;
                const betAmount = success.betAmount;
                const channelID = success.channelID;
                if (profile) {
                  Outcome.findOne({ symbol: success.Code }, (err, inv) => {
                    const yourWinnings = 3 * investAmount;
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
                            .setTitle(`Good Investment!`)
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
                                value: investAmount,
                              },
                              {
                                name: "Winnings",
                                value: yourWinnings.toFixed(2),
                              },
                              {
                                name: "Profit",
                                value: (yourWinnings - investAmount).toFixed(2),
                              }
                            )
                            .setFooter(
                              "visit http://localhost:3000/betsst to view bets!"
                            )
                            .setURL("http://localhost:3000/betsst");
                          client.channels.cache.get(channelID).send(newEmbed);
                        });
                      }
                    );
                  });
                }
              });
          });
          Bet.deleteMany({}, (error, deleted) => {
            if (error) {
              console.log(error);
            }
          });
        }
      });

      setTimeout(checkForPosts, 1000 * 10);
    };*/

    const code = args[1];
    const amt = args[0];
    if (!code) {
      return message.channel.send(`No Code Provided`);
    } if (amt > profileData.coins) {
      return message.channel.send(`Not Enough tokens...`);
    }
    if (isNaN(amt)) {
      return message.channel.send(`That's not a number`);
    }
    try {
      Bet.findOne(
        {
          $and: [
            { creatorID: message.author.id },
            { $or: [{ Code: code }, { Code2: code }, { Code3: code }] },
          ],
        },
        (err, bet) => {
          if (err) {
            return console.log(err);
          }
          if (bet) {
            return message.channel.send("Bet Exists");
          }
          Outcome.findOne(
            {
              $or: [
                { "option1.0.Code": code },
                { "option1.0.Code2": code },
                { "option1.0.Code3": code },
              ],
            },
            (err, outcomeData) => {
              if (!outcomeData) {
                return message.channel.send("Perhaps the betCode is wrong?");
              }
              const amt = parseInt(args[0]);
              var day = moment.utc().format("DD");
              var month = moment.utc().format("MM");
              var date = moment.utc().format("MM-DD HH:mm");
              var date1 = outcomeData.timeStart;
              if (date > date1) {
                const newEmbed = new Discord.MessageEmbed()
                  .setColor("#304281")
                  .setTitle(`Match Already Started!`)
                  .setAuthor(
                    message.author.username,
                    message.author.displayAvatarURL({
                      format: "png",
                      dynamic: true,
                    })
                  )
                  .setDescription(
                    `Please place your bet commands before matches begin.`
                  )
                  .setFooter(
                    "visit http://localhost:3000/bets to view more bets!"
                  )
                  .setURL("http://localhost:3000/bets ");
                return message.channel.send(newEmbed);
              }
              console.log(outcomeData);
              if (outcomeData) {
                if (err) {
                  return console.log(err);
                }
                if (outcomeData.option1[0].Code == code) {
                  const odds = outcomeData.option1[0].odds;
                  profileData.coins = profileData.coins - amt;
                  profileData.save();
                  Bet.create(
                    {
                      creatorID: message.author.id,
                      serverID: message.guild.id,
                      channelID: message.channel.id,
                      creatorName: message.author.username,
                      outcomeID: outcomeData.outcomeID,
                      betAmount: amt,
                      Code: code,
                      betOdds: odds,
                      possibleWinnings: odds * amt,
                    },
                    (err, res) => {
                      if (err) {
                        return console.log(err);
                      }
                      res.save();
                      const newEmbed = new Discord.MessageEmbed()
                        .setColor("#304281")
                        .setTitle(`Bet Ticket`)
                        .setAuthor(
                          message.author.username,
                          message.author.displayAvatarURL({
                            format: "png",
                            dynamic: true,
                          })
                        )
                        .setDescription("Good Luck :)")
                        .addFields(
                          { name: "Bet Amount", value: amt },
                          { name: "Code", value: code }
                        )
                        .setFooter(
                          "visit http://localhost:3000/bet to view more bets!"
                        )
                        .setURL("http://localhost:3000/bet");
                      message.channel.send(newEmbed);
                    }
                  );
                }
                if (outcomeData.option1[0].Code2 == code) {
                  const odds = outcomeData.option1[0].odds2;
                  profileData.coins = profileData.coins - amt;
                  profileData.save();
                  Bet.create(
                    {
                      creatorID: message.author.id,
                      serverID: message.guild.id,
                      channelID: message.channel.id,
                      creatorName: message.author.username,
                      outcomeID: outcomeData.outcomeID,
                      betAmount: amt,
                      Code: code,
                      betOdds: odds,
                      possibleWinnings: odds * amt,
                    },
                    (err, res) => {
                      if (err) {
                        return console.log(err);
                      }
                      console.log(res);
                      res.save();
                      const newEmbed = new Discord.MessageEmbed()
                        .setColor("#304281")
                        .setTitle(`Bet Ticket`)
                        .setAuthor(
                          message.author.username,
                          message.author.displayAvatarURL({
                            format: "png",
                            dynamic: true,
                          })
                        )
                        .setDescription("Good Luck :)")
                        .addFields(
                          { name: "Bet Amount", value: amt },
                          { name: "Code", value: code }
                        )
                        .setFooter(
                          "visit http://localhost:3000/bet to view more bets!"
                        )
                        .setURL("http://localhost:3000/bet");
                      message.channel.send(newEmbed);
                    }
                  );
                }
                if (outcomeData.option1[0].Code3 == code) {
                  const odds = outcomeData.option1[0].odds3;
                  profileData.coins = profileData.coins - amt;
                  profileData.save();
                  Bet.create(
                    {
                      creatorID: message.author.id,
                      serverID: message.guild.id,
                      channelID: message.channel.id,
                      creatorName: message.author.username,
                      outcomeID: outcomeData.outcomeID,
                      betAmount: amt,
                      Code: code,
                      betOdds: odds,
                      possibleWinnings: odds * amt,
                    },
                    (err, res) => {
                      if (err) {
                        return console.log(err);
                      }
                      console.log(res);
                      res.save();
                      const newEmbed = new Discord.MessageEmbed()
                        .setColor("#304281")
                        .setTitle(`Bet Ticket`)
                        .setAuthor(
                          message.author.username,
                          message.author.displayAvatarURL({
                            format: "png",
                            dynamic: true,
                          })
                        )
                        .setDescription("Good Luck :)")
                        .addFields(
                          { name: "Bet Amount", value: amt },
                          { name: "Code", value: code }
                        )
                        .setFooter(
                          "visit http://localhost:3000/bet to view more bets!"
                        )
                        .setURL("http://localhost:3000/bet");
                      message.channel.send(newEmbed);
                    }
                  );
                }
              }
            }
          );
        }
      );
    } catch (err) {
      console.log(err, "heuy");
    }
  },
};
