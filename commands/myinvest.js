const Invest = require("../models/investSchema");

module.exports = {
  name: "myinvest",
  cooldown: 1,
  description: "Your investments!",
  execute(client, message, args, Discord, profileData) {
    try {
      Invest.find({ creatorID: message.author.id }).exec(function (err, investments) {
        if (!investments.length) {
          const newEmbed = new Discord.MessageEmbed()
            .setColor("#304281")
            .setTitle("Error")
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
            .setDescription("No Investments :(")
            .addFields({ name: "For Invest commands", value: "visit link" })
            .setURL("https://getmeow.gg/betsst");
          return message.channel.send(newEmbed);
        }
        let yourinvestments = "";
        let tokens = "";
        for (let i = 0; i < investments.length; i++) {
          const investmentSlip = investments[i];
          const invest = investmentSlip.Code;
          const token = investmentSlip.investAmount;
          yourinvestments += `\`${i + 1}\` ${invest}\n`;
          tokens += `\`${token}\`\n`;
        }
        const newEmbed = new Discord.MessageEmbed()
          .setColor("#304281")
          .setTitle("Current Investments")
          .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
          .setDescription("Your Investments :)")
          .addFields(
            { name: "Code", value: yourinvestments, inline: true },
            { name: "Tokens", value: tokens, inline: true },
          )
          .setFooter("visit https://getmeow.gg/betsst to view more investmentss!")
          .setURL("https://getmeow.gg/betsst");
        message.channel.send(newEmbed);
      });
    } catch (e) {
      console.log(e);
    }
  },
};
