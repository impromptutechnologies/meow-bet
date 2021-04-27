const Invest = require("../models/investSchema");
const Investment = require("../models/investmentSchema");

module.exports = {
  name: "invest",
  cooldown: 1,
  description: "Invest!",
  execute(client, message, args, Discord, profileData) {
    const code = args[1];
    const amt = args[0];
    if (!code) {
      return message.channel.send(`No Code Provided`);
    } else if (amt > profileData.coins) {
      return message.channel.send(`Not Enough tokens...`);
    }
    profileData.save();
    try {
      Invest.findOne(
        { creatorID: message.author.id, Code: code },
        (err, invest) => {
          if (err) {
            return console.log(err);
          } else if (invest) {
            return message.channel.send("Bet Exists");
          }
          Investment.findOne(
            {
              $or: [{ option1: code }, { option2: code }],
            },
            (err, investmentData) => {
              console.log(investmentData);
              if (investmentData) {
                if (err) {
                  return console.log(err);
                }
                if (investmentData.option1 == code) {
                profileData.coins = profileData.coins - amt;
                profileData.save();
    
                  Invest.create(
                    {
                      creatorID: message.author.id,
                      //serverID: message.guild.id,
                      creatorName: message.author.username,
                      investID: investmentData.investmentID,
                      investAmount: amt,
                      Code: code,
                      possibleEarnings: 1.5 * amt,
                    },
                    (err, res) => {
                      if (err) {
                        return console.log(err);
                      }
                      res.save();
                      const newEmbed = new Discord.MessageEmbed()
                        .setColor("#304281")
                        .setTitle(`${message.author.username}'s Investment Ticket`)
                        .setDescription("Good Luck :)")
                        .addFields(
                          { name: "Invested Amount", value: amt },
                          { name: "Code", value: code }
                        )
                        .setFooter(
                          "visit http://localhost:3000/betsst to view more stocks/cryptos!"
                        )
                        .setURL("http://localhost:3000/betsst");
                      message.channel.send(newEmbed);
                    }
                  );
                }
                if (investmentData.option2 == code) {
                  profileData.coins = profileData.coins - amt;
                  profileData.save();
                  Invest.create(
                    {
                      creatorID: message.author.id,
                      //serverID: message.guild.id,
                      creatorName: message.author.username,
                      investID: investmentData.investmentID,
                      investAmount: amt,
                      Code: code,
                      possibleEarnings: 1.5 * amt,
                    },
                    (err, res) => {
                      if (err) {
                        return console.log(err);
                      }
                      console.log(res);
                      res.save();
                      const newEmbed = new Discord.MessageEmbed()
                        .setColor("#304281")
                        .setTitle(`${message.author.username}'s Investment Ticket`)
                        .setDescription("Good Luck :)")
                        .addFields(
                          { name: "Invested Amount", value: amt },
                          { name: "Code", value: code }
                        )
                        .setFooter(
                          "visit http://localhost:3000/betsst to view more stocks/cryptos!"
                        )
                        .setURL("http://localhost:3000/betsst");
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
