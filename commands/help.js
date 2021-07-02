module.exports = {
  name: "help",
  description: "help commands",
  execute(client, message, args, Discord, profileData) {
    const newEmbed = new Discord.MessageEmbed()
      .setColor("#304281")
      .setTitle(`Useful Resources`)
      .setDescription("Our website contains all the info you need!")
      .addFields(
        { name: "Homepage", value: "getmeow.gg/bets" },
        { name: "Check Bankroll", value: "!bankroll" },
        { name: "Claim Winnings", value: "!claim" },
        { name: "Command/Bets", value: "getmeow.gg/bets" },
        { name: "Get Tokens", value: "getmeow.gg/tokens" },
        { name: "Contact", value: `contact@getmeow.gg` },
        { name: "T&C", value: "getmeow.gg/terms" }
      )
      .setURL("https://getmeow.gg/bets");
    message.channel.send(newEmbed);
  },
};
