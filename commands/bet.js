const Bet = require("../models/betSchema");
const Outcome = require("../models/outcomeSchema");

module.exports = {
  name: "bet",
  cooldown: 30,
  description: "Place a bet!",
  execute(client, message, args, Discord, profileData) {
    const code = args[1];
    const amt = args[0];
    if (!code) {
      return message.channel.send(`No Code Provided`);
    } else if (amt > profileData.coins) {
      return message.channel.send(`Not Enough tokens...`);
    }
    
    try {
      Bet.findOne(
        { creatorID: message.author.id, Code: code },
        (err, bet) => {
          if (err) {
            return console.log(err);
          } else if (bet) {
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
                      //serverID: message.guild.id,
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
                        .setTitle(`${message.author.username}'s Bet Ticket`)
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
                      //serverID: message.guild.id,
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
                        .setTitle(`${message.author.username}'s Bet Ticket`)
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
                      //serverID: message.guild.id,
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
                        .setTitle(`${message.author.username}'s Bet Ticket`)
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
