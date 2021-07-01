const Invest = require("../models/investSchema");
const moment = require("moment-timezone");
const Crypto = require("../models/cryptoSchema");

module.exports = {
  name: "invcrypto",
  cooldown: 1,
  description: "Invest in Crypto!",
  execute(client, message, args, Discord, profileData) {
    const code = args[1];
    const amt = parseInt(args[0]);
    if(isNaN(amt)){
      return message.channel.send(
        `That's not a number`
      );
    }
    var day = moment.utc().format("DD");
    var month = moment.utc().format("MM");
    var date = moment.utc().format("MM-DD HH:mm");
    var date1 = moment.utc().format(`${month}-${day} 13:30`);
    var date2 = moment.utc().format(`${month}-${day} 21:35`);
    if (date > date1 && date < date2) {
      const newEmbed = new Discord.MessageEmbed()
        .setColor("#304281")
        .setTitle(`Market Already Open!`)
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ format: "png", dynamic: true })
        )
        .setDescription(
          `Please place your crypto invest commands between  9:30am to 4pm ET\n
          Meow crypto bets follows the same hours of the stock market when judging returns.`
        )
        .setFooter(
          "visit https://getmeow.gg/betscr to view more crypto!"
        )
        .setURL("https://getmeow.gg/betscr");
      return message.channel.send(newEmbed);
    }
    if (!code) {
      return message.channel.send(`No Code Provided`);
    }
    if (amt > profileData.coins) {
      return message.channel.send(`Not Enough tokens...`);
    }

    try {
      Invest.findOne(
        { creatorID: message.author.id, Code: code },
        (err, invest) => {
          if (err) {
            return console.log(err);
          } else if (invest) {
            return message.channel.send("Investment Exists");
          }
          Crypto.findOne(
            {
              symbol: code
            },
            (err, stockData) => {
              if (err) {
                return message.channel.send("Wrong Code")
              }
              if (stockData) {
                  if (message.guild === null) {
                    return message.author.send(
                      "This particular command must be placed in a server"
                    );
                  }
                  profileData.coins = profileData.coins - amt;
                  profileData.save();
                  Invest.create(
                    {
                      creatorID: message.author.id,
                      serverID: message.guild.id,
                      channelID: message.channel.id,
                      category: "crypto",
                      creatorName: message.author.username,
                      status: "unchanged",
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
                        .setThumbnail("https://altvaton.sirv.com/Images/194312417_1218343265288417_112965584957259991_n.png")
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
                          { name: "Crypto", value: code }
                        )
                        .setFooter(
                          "visit https://getmeow.gg/betscr to view more cryptos!"
                        )
                        .setURL("https://getmeow.gg/betscr");
                      message.channel.send(newEmbed);
                    }
                  );
              }
            }
          ).lean();
        }
      ).lean();
    } catch (err) {
      console.log(err, "hey");
    }
  },
};
