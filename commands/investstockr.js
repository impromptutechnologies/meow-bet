const Invest = require("../models/investSchema");
const moment = require("moment-timezone");
const Stock = require("../models/stockSchema");
const Profile = require("../models/profileSchema");

module.exports = {
  name: "invstock",
  cooldown: 1,
  description: "Invest stock!",
  execute(client, message, args, Discord, profileData) {
    const code = args[1];
    const amt = parseInt(args[0]);
    if (isNaN(amt) || !code || amt > profileData.tokens) {
      return message.channel.send(
        `Error: please check the command again or your bankroll.`
      );
    }
    if (message.guild === null) {
      return message.author.send(
        "This particular command must be placed in a server"
      );
    }
    var day = moment.utc().format("DD");
    var month = moment.utc().format("MM");
    var date = moment.utc().format("MM-DD HH:mm");
    var date1 = moment.utc().format(`${month}-${day} 13:30`);
    var date2 = moment.utc().format(`${month}-${day} 21:35`);
    var today = new Date();
    if (
      date > date1 &&
      date < date2 &&
      today.getDay() !== 6 &&
      today.getDay() !== 0
    ) {
      const newEmbed = new Discord.MessageEmbed()
        .setColor("#304281")
        .setTitle(`Market Already Open!`)
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ format: "png", dynamic: true })
        )
        .setDescription(
          `The US stock market opens from 9:30am to 4pm ET so place your commands before the market opens. Weekdays Only.`
        )
        .setFooter("visit https://getmeow.gg/betsst to view more investments!")
        .setURL("https://getmeow.gg/betsst");
      return message.channel.send(newEmbed);
    }
    try {
          Stock.findOne(
            {
              ticker: code,
            },
            (err, stockData) => {
              if (err) {
                return message.channel.send("Wrong Code");
              }
              if (stockData) {
                /*profileData.tokens = profileData.tokens - amt;
                profileData.bettokens = profileData.bettokens + amt;
                profileData.save();*/
                const prof = Profile.findOneAndUpdate(
                  { userID: profileData.userID },
                  { $inc: { tokens: -amt } }, (req, res) => {
                });
                Invest.create(
                  {
                    creatorID: message.author.id,
                    serverID: message.guild.id,
                    channelID: message.channel.id,
                    category: "stocks",
                    creatorName: message.author.username,
                    status: "open",
                    investAmount: amt,
                    Code: code,
                  },
                  (err, res) => {
                    if (err) {
                      return console.log(err);
                    }
                    res.save();
                    const newEmbed = new Discord.MessageEmbed()
                      .setColor("#304281")
                      .setTitle(`Investment Ticket`)
                      .setThumbnail(
                        "https://altvaton.sirv.com/Images/194312417_1218343265288417_112965584957259991_n.png"
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
                        { name: "Invested Amount", value: amt },
                        { name: "Stock", value: code }
                      )
                      .setFooter(
                        "visit https://getmeow.gg/betsst to view more stocks!"
                      )
                      .setURL("https://getmeow.gg/betsst");
                    message.channel.send(newEmbed);
                  }
                );
              }
            }
          ).lean();
    } catch (err) {
      console.log(err, "hey");
    }
  },
};
