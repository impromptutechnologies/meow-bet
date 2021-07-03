module.exports = {
  name: "help",
  description: "help commands",
  execute(client, message, args, Discord, profileData) {
    const newEmbed = new Discord.MessageEmbed()
      .setColor("#304281")
      .setTitle(`Useful Resources`)
      .setDescription("Our website contains all the info you need!")
      .addFields(
        { name: "Homepage", value: "https://getmeow.gg/" },
        { name: "Check Bankroll", value: "!bankroll" },
        { name: "Claim Winnings", value: "!claim" },
        { name: "Command/Bets", value: "https://getmeow.gg/bets" },
        { name: "Get Tokens", value: "https://getmeow.gg/tokens" },
        { name: "Contact", value: `contact@getmeow.gg` },
        { name: "T&C", value: "https://getmeow.gg/terms" }
      )
      .setURL("https://getmeow.gg/bets");
    message.channel.send(newEmbed);
  },
};
