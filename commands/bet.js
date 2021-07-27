const Bet = require("../models/betSchema");
const Outcome = require("../models/outcomeSchema");
const moment = require("moment-timezone");

module.exports = {
  name: "bet",
  cooldown: 1,
  description: "Place a bet!",
  execute(client, message, args, Discord, profileData) {
    const code = args[1];
    const amt = args[0];
    if (!code || amt > profileData.tokens || isNaN(amt)) {
      return message.channel.send(
        `Error: please check the command again or your bankroll.`
      );
    }
    if (message.guild === null) {
      return message.author.send(
        "This particular command must be placed in a server"
      );
    }
    try {
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
              .setFooter("visit https://getmeow.gg/bets to view more bets!")
              .setURL("https://getmeow.gg/bets");
            return message.channel.send(newEmbed);
          }
          if (outcomeData) {
            if (err) {
              return console.log(err);
            }
            const newEmbed = new Discord.MessageEmbed()
              .setColor("#304281")
              .setTitle(`Bet Ticket`)
              .setThumbnail(
                "https://altvaton.sirv.com/Images/187021818_235092514616298_5622261190586926658_n.png"
              )
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
              .setFooter("visit https://getmeow.gg/bets to view more bets!")
              .setURL("https://getmeow.gg/bets");
            if (outcomeData.option1[0].Code == code) {
              const odds = outcomeData.option1[0].odds;
              profileData.tokens = profileData.tokens - amt;
              /*profileData.bettokens = profileData.bettokens + amt;*/
              profileData.save();
              Bet.create(
                {
                  creatorID: message.author.id,
                  serverID: message.guild.id,
                  channelID: message.channel.id,
                  creatorName: message.author.username,
                  status: "unchanged",
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
                  message.channel.send(newEmbed);
                }
              );
            }
            if (outcomeData.option1[0].Code2 == code) {
              const odds = outcomeData.option1[0].odds2;
              profileData.tokens = profileData.tokens - amt;
              /*profileData.bettokens = profileData.bettokens + amt;*/
              profileData.save();
              Bet.create(
                {
                  creatorID: message.author.id,
                  serverID: message.guild.id,
                  channelID: message.channel.id,
                  creatorName: message.author.username,
                  status: "unchanged",
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

                  message.channel.send(newEmbed);
                }
              );
            }
            if (outcomeData.option1[0].Code3 == code) {
              const odds = outcomeData.option1[0].odds3;
              profileData.tokens = profileData.tokens - amt;
              /*profileData.bettokens = profileData.bettokens + amt;*/
              profileData.save();
              Bet.create(
                {
                  creatorID: message.author.id,
                  serverID: message.guild.id,
                  channelID: message.channel.id,
                  creatorName: message.author.username,
                  status: "unchanged",
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
                  message.channel.send(newEmbed);
                }
              );
            }
          }
        }
      ).lean();
    } catch (err) {
      console.log(err, "heuy");
    }
  },
};
