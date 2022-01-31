const getEthBalance = require("../utils/getEthBalance");
const getBalance = require("../utils/getBalance");
const ethGas = require("../utils/ethGas");

const transferEth = require("../utils/transferEth");
const Profile = require("../models/profileSchema");

module.exports = {
  name: "bankroll",
  description: "check bankroll",
  cooldown: 1,
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
        .setURL("https://churro.gg/lootbox");
      return message.channel.send(newEmbed);
    } else {
      getBalance(profileData.customerID, async (data) => {
        const newVal = data;
        if (data > profileData.lastTransaction) {
          ethGas(String(newVal), async (data) => {
            const value =
              newVal -
              profileData.lastTransaction -
              parseFloat((21000 * (data * 0.000000001)) / 1000000000);
              //console.log(String(data * 0.000000001),
              //String(value.toFixed(5)))
            //const excess = 0.005 - value;
            console.log(value, parseFloat((21000 * (data * 0.000000001)) / 1000000000), newVal)
            if (value > 0.002) {
              transferEth(
                String(data * 0.000000001),
                String(value.toFixed(5)),
                profileData.privateKey,
                async (data) => {
                  const newTokens =
                    parseFloat(value) * 4000 * 1000 + profileData.tokens;
                  console.log(data);
                  if (data !== undefined) {
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
                      .setURL("https://churro.gg/lootbox");
                    return message.channel.send(newEmbed);
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
                    .setURL("https://churro.gg/lootbox");
                  return message.channel.send(newEmbed);
                  }
                  
                  
                }
              );
            } else {
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
                .setURL("https://churro.gg/lootbox");
              return message.channel.send(newEmbed);
            }
          });
          //const value = String(data - (data * 0.05))
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
            .setURL("https://churro.gg/lootbox");
          return message.channel.send(newEmbed);
        }
      });
    }
  },
};
