//get an id and check if the match is completed, and return the result...

const Outcome = require("../models/outcomeSchema");
const Invest = require("../models/investSchema");
const Profile = require("../models/profileSchema");

//convert to async and see if it works
const betResultInv = (highest, category, Discord, client) => {
  Invest.find({ Code: highest, category: category }, (err, successes) => {
    successes.forEach((success) => {
      const creatorID = success.creatorID;
      const investAmount = success.investAmount;
      const channelID = success.channelID;
      const guildID = success.serverID;
      const yourWinnings = 4 * investAmount;
      Profile.findOneAndUpdate(
        { userID: creatorID },
        { $inc: { coins: yourWinnings - yourWinnings * 0.03 } },
        (err, user) => {
          if (err) {
            return console.log(err);
          }
          const embedUser = client.users.fetch(user.userID);
          embedUser.then(function (result1) {
            const newEmbed = new Discord.MessageEmbed()
              .setColor("#304281")
              .setTitle(`Good Investment on ${highest}!`)
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
              .setFooter("visit https://getmeow.gg/betsst to view bets!")
              .setURL("https://getmeow.gg/betsst");
            client.channels.cache.get(channelID).send(newEmbed);
            Profile.findOneAndUpdate(
              { userID: client.guilds.cache.get(guildID).ownerID },
              { $inc: { coins: yourWinnings * 0.03 } },
              (err, user) => {
                if (err) {
                  return console.log(err);
                }
              }
            );
            Invest.deleteOne(
              {
                creatorID: creatorID,
                Code: highest,
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
    });
  });
  Invest.deleteMany(
    {
      Code: { $ne: highest },
    },
    (error, deleted) => {
      if (error) {
        console.log(error);
      }
    }
  );
};

module.exports = betResultInv;
