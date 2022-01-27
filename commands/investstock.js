const Invest = require("../models/investSchema");
const moment = require("moment-timezone");
const Stock = require("../models/stockSchema");
const Profile = require("../models/profileSchema");

module.exports = {
  name: "invstock",
  cooldown: 1,
  description: "Invest stock!",
  execute(client, message, args, Discord, profileData) {
    const code = args[0];
    const amt = 5000;
    if (isNaN(amt) || !code || amt > profileData.tokens) {
      return message.channel.send(
        `Error: please check the command again or your bankroll. It costs 5000 Gems 💎 to enter the stock race :)`
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
        .setFooter("visit https://churro.gg/betsst to view more investments!")
        .setURL("https://churro.gg/betsst");
      return message.channel.send(newEmbed);
    }
    try {
          
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
                      .setTitle(`Nice Stock Pick.`)
                      .setThumbnail(
                        "https://altvaton.sirv.com/Images/gem-stone_1f48e.png"
                      )
                      .setAuthor(
                        message.author.username,
                        message.author.displayAvatarURL({
                          format: "png",
                          dynamic: true,
                        })
                      )
                      .setDescription("I hope :)")
                      .addFields(
                        { name: "Amount", value: amt },
                        { name: "Stock Ticker", value: code }
                      )
                      .setFooter(
                        "visit https://churro.gg/betsst to view more stocks!"
                      )
                      .setURL("https://churro.gg/betsst");
                    message.channel.send(newEmbed);
                  }
                );
            
    } catch (err) {
      console.log(err, "hey");
    }
  },
};
