const Bet = require("../models/betSchema");
const Outcome = require("../models/outcomeSchema");
const moment = require("moment-timezone");
const Profile = require("../models/profileSchema");

module.exports = {
  name: "bet",
  cooldown: 1,
  description: "Place a bet!",
  execute(client, message, args, Discord, profileData) {
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
                    "visit https://getmeow.gg/bets to view more bets!"
                  )
                  .setURL("https://getmeow.gg/bets ");
                return message.channel.send(newEmbed);
              }
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
                      status: 'unchanged',
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
                        .setTitle(`Bet Placed!`)
                        .setThumbnail("https://altvaton.sirv.com/Images/187021818_235092514616298_5622261190586926658_n.png")
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
                          "visit https://getmeow.gg/bets to view more bets!"
                        )
                        .setURL("https://getmeow.gg/bets");
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
                      status: 'unchanged',
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
                        .setThumbnail("https://altvaton.sirv.com/Images/187021818_235092514616298_5622261190586926658_n.png")
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
                          "visit https://getmeow.gg/bets to view more bets!"
                        )
                        .setURL("https://getmeow.gg/bets");
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
                      status: 'unchanged',
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
                        .setThumbnail("https://altvaton.sirv.com/Images/187021818_235092514616298_5622261190586926658_n.png")
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
                          "visit https://getmeow.gg/bets to view more bets!"
                        )
                        .setURL("https://getmeow.gg/bets");
                      message.channel.send(newEmbed);
                    }
                  );
                }
              }
            }
          ).lean();
        }
      ).lean();
    } catch (err) {
      console.log(err, "heuy");
    }
  },
};
