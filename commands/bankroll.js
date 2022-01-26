const getEthBalance = require("../utils/getEthBalance");
const getBalance = require("../utils/getBalance");
const transferEth = require("../utils/transferEth");
const Profile = require("../models/profileSchema");

module.exports = {
  name: "bankroll",
  description: "check bankroll",
  execute(client, message, args, Discord, profileData) {
    if (!profileData.privateKey) {
      const newEmbed = new Discord.MessageEmbed()
        .setColor("#304281")
        .setTitle(`Your Bankroll`)
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ format: "png", dynamic: true })
        )
        .setDescription("Your current bankroll")
        .setThumbnail("https://altvaton.sirv.com/Images/gem-stone_1f48e.png")
        .addFields({
          name: "Bankroll",
          value: profileData.tokens.toFixed(2),
        })
        .setURL("https://getmeow.gg/tokens");
      return message.channel.send(newEmbed);
    } else {
      getEthBalance(profileData.depositAddress, async (data) => {
        console.log(data);
        if (data >= 0.005) {
          //const value = String(data - (data * 0.05))
          const value = String(data - 0.001);
          if(profileData.lastTransaction == ""){
            transferEth(String(value), profileData.privateKey, async (data) => {
              const newTokens =
                (parseFloat(value) * 10000) / 0.01 + profileData.tokens;
              const portfolio = await Profile.findOneAndUpdate(
                {
                  customerID: profileData.customerID,
                },
                { tokens: newTokens, lastTransaction: data }
              );
              const newEmbed = new Discord.MessageEmbed()
                .setColor("#304281")
                .setTitle(`Balance Updated! Deposit has gone through.`)
                .setAuthor(
                  message.author.username,
                  message.author.displayAvatarURL({
                    format: "png",
                    dynamic: true,
                  })
                )
                .setDescription("Your new bankroll")
                .setThumbnail(
                  "https://altvaton.sirv.com/Images/gem-stone_1f48e.png"
                )
                .addFields({
                  name: "Bankroll",
                  value: newTokens.toFixed(2),
                })
                .setURL("https://getmeow.gg/tokens");
              return message.channel.send(newEmbed);
            
          });
          }else{
            const newEmbed = new Discord.MessageEmbed()
                .setColor("#304281")
                .setTitle(`Your Bankroll`)
                .setAuthor(
                  message.author.username,
                  message.author.displayAvatarURL({
                    format: "png",
                    dynamic: true,
                  })
                )
                .setDescription("Your current bankroll")
                .setThumbnail(
                  "https://altvaton.sirv.com/Images/gem-stone_1f48e.png"
                )
                .addFields({
                  name: "Bankroll",
                  value: profileData.tokens.toFixed(2),
                })
                .setURL("https://getmeow.gg/tokens");
              return message.channel.send(newEmbed);
          }

          



        } else {
          const portfolio = await Profile.findOneAndUpdate(
            {
              customerID: profileData.customerID,
            },
            { lastTransaction: "" }
          );
          const newEmbed = new Discord.MessageEmbed()
            .setColor("#304281")
            .setTitle(`Your Bankroll`)
            .setAuthor(
              message.author.username,
              message.author.displayAvatarURL({ format: "png", dynamic: true })
            )
            .setDescription("Your current bankroll")
            .setThumbnail(
              "https://altvaton.sirv.com/Images/gem-stone_1f48e.png"
            )
            .addFields({
              name: "Bankroll",
              value: profileData.tokens.toFixed(2),
            })
            .setURL("https://getmeow.gg/tokens");
          return message.channel.send(newEmbed);
        }
      });
    }
  },
};
