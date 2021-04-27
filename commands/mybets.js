const Bet = require("../models/betSchema");

module.exports = {
  name: "mybets",
  cooldown: 1,
  description: "Your bets!",
  execute(client, message, args, Discord, profileData) {
    try {
      Bet.find({ creatorID: message.author.id }).exec(function (err, bets) {
        if (!bets.length) {
          console.log("nonexist");
          const newEmbed = new Discord.MessageEmbed()
            .setColor("#304281")
            .setTitle("Error")
            .setDescription("No Bets Placed :(")
            .addFields({ name: "To Place Bet", value: "visit link" })
            .setFooter("visit http://localhost:3000/bet to view bets!")
            .setURL("http://localhost:3000/bet");
          return message.channel.send(newEmbed);
        }
        let yourbets = "";
        let tokens = "";
        let odds = "";
        for (let i = 0; i < bets.length; i++) {
          const betslip = bets[i];
          const bet = betslip.betCode;
          const token = betslip.betAmount;
          const odd = betslip.betOdds;
          yourbets += `\`${i + 1}\` ${bet}\n`;
          tokens += `\`${token}\`\n`;
          odds += `\`${odd}\`\n`;
        }
        const newEmbed = new Discord.MessageEmbed()
          .setColor("#304281")
          .setTitle("Open Bets")
          .setDescription("Your Open Bets :)")
          .addFields(
            { name: "Code", value: yourbets, inline: true },
            { name: "Tokens", value: tokens, inline: true },
            { name: "Odds", value: odds, inline: true }
          )
          .setFooter("visit http://localhost:3000/bet to view more bets!")
          .setURL("http://localhost:3000/bet");
        message.channel.send(newEmbed);
      });
    } catch (e) {
      console.log(e);
    }
  },
};
