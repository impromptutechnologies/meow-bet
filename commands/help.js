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
        { name: "ETH Deposit Address", value: "!deposit" },
        { name: "Your Account", value: "https://getmeow.gg/account" },
        { name: "Refresh Bankroll", value: "!refresh" },
        { name: "Command/Bets", value: "https://getmeow.gg/bets" },
        { name: "Open Bets", value: "!mybets" },
        { name: "Claim Winnings", value: "!claim" },
        { name: "Contact", value: `contact@getmeow.gg` },
        { name: "T&C", value: "https://getmeow.gg/terms" }
      )
      .setURL("https://getmeow.gg/bets");
    message.channel.send(newEmbed);
  },
};
