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
      getBalance(profileData.customerID, async (data) => {
        console.log(data);
        const newVal = data;
        if (data > profileData.lastTransaction) {
          //const value = String(data - (data * 0.05))
          const value = (data - profileData.lastTransaction) - 0.002;
          console.log(value, profileData.lastTransaction);
          const excess = 0.004-value
          if(value > 0.004){
            transferEth(String(value), profileData.privateKey, async (data) => {
              const newTokens =
                ((parseFloat(value) * 3000)*1000) + profileData.tokens;
              const portfolio = await Profile.findOneAndUpdate(
                {
                  customerID: profileData.customerID,
                },
                { tokens: newTokens, lastTransaction: newVal }
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
