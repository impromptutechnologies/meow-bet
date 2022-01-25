const Bet = require("../models/betSchema");

module.exports = {
  name: "mybets",
  cooldown: 1,
  description: "Your bets!",
  execute(client, message, args, Discord, profileData) {
    try {
      Bet.find({ creatorID: message.author.id }).exec(function (err, bets) {
        if (!bets.length) {
          const newEmbed = new Discord.MessageEmbed()
            .setColor("#304281")
            .setTitle("Error")
            .setAuthor(
              message.author.username,
              message.author.displayAvatarURL({ format: "png", dynamic: true })
            )
            .setDescription("No Bets Placed :(")
            .addFields({ name: "For Bet commands", value: "visit link" })
            .setFooter("visit https://getmeow.gg/bets to view bets!")
            .setURL("https://getmeow.gg/bets");
          return message.channel.send(newEmbed);
        }
        let yourbets = "";
        let tokens = "";
        let odds = "";
        for (let i = 0; i < bets.length; i++) {
          const betslip = bets[i];
          const bet = betslip.Code;
          const token = betslip.betAmount;
          const odd = betslip.betOdds;
          yourbets += `\`${i + 1}\` ${bet}\n`;
          tokens += `\`${token}\`\n`;
          odds += `\`${odd}\`\n`;
        }
        const newEmbed = new Discord.MessageEmbed()
          .setColor("#304281")
          .setTitle("Open Bets")
          .setAuthor(
            message.author.username,
            message.author.displayAvatarURL({ format: "png", dynamic: true })
          )
          .setDescription("Your Open Bets :)")
          .addFields(
            { name: "Code", value: yourbets, inline: true },
            { name: "Gems", value: tokens, inline: true },
            { name: "Odds", value: odds, inline: true }
          )
          .setFooter("visit https://getmeow.gg/bets to view more bets!")
          .setURL("https://getmeow.gg/bets");
        message.channel.send(newEmbed);
      });
    } catch (e) {
      console.log(e);
    }
  },
};
