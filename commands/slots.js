const Profile = require("../models/profileSchema");
module.exports = {
  name: "slotsdd",
  cooldown: 1,
  description: "Play the Slots!",
  execute(client, message, args, Discord, profileData) {
    const amt = args[0];
    if (isNaN(amt) || !amt || amt > profileData.tokens) {
      return message.channel.send(
        `Error: please check the command again or your bankroll.`
      );
    }
    /*if (profileData.payments[0] == null) {
      return message.channel.send(`Please purchase a lootbox to access :)`);
    }*/
    min = Math.ceil(0);
    max = Math.floor(11);
    const chances = Math.floor(Math.random() * (max - min) + min);
    const winnin = Math.floor(Math.random() * (200 - 115) + 115) / 115;
    const coinz = profileData.tokens;
    if (chances >= 5) {
      Profile.findOneAndUpdate(
        { userID: message.author.id },
        { tokens: coinz - parseInt(amt) },
        (err, user) => {
          if (err) {
            return console.log(err);
          }
          const newEmbed = new Discord.MessageEmbed()
            .setColor("#304281")
            .setTitle("Sorry....")
            .setAuthor(
              message.author.username,
              message.author.displayAvatarURL({ format: "png", dynamic: true })
            )
            .setAuthor(
              message.author.username,
              message.author.displayAvatarURL({
                format: "png",
                dynamic: true,
              })
            )
            .setDescription("Better luck next time :(")
            .setFooter(
              "visit https://churro.gg/casino to view more casino games!"
            )
            .setURL("https://churro.gg/casino");
          return message.channel.send(newEmbed);
        }
      );
    } else {
      Profile.findOneAndUpdate(
        { userID: message.author.id },
        { tokens: coinz + Math.floor(amt * winnin - amt) },
        (err, user) => {
          if (err) {
            return console.log(err);
          }
          const newEmbed = new Discord.MessageEmbed()
            .setColor("#304281")
            .setTitle(`Congrats ${message.author.username}!`)
            .setDescription("You managed to win! :)")
            .addFields(
              { name: "Bet Amount", value: amt },
              { name: "Winnings", value: (amt * winnin).toFixed(2) },
              { name: "Profit", value: (amt * winnin - amt).toFixed(2) }
            ).setAuthor(
              message.author.username,
              message.author.displayAvatarURL({
                format: "png",
                dynamic: true,
              })
            )
            .setFooter(
              "visit https://churro.gg/casino to view more casino games!"
            )
            .setURL("https://churro.gg/casino");
          return message.channel.send(newEmbed);
        }
      );
    }
  },
};
