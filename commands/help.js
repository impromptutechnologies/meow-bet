module.exports = {
  name: "help",
  description: "help commands",
  execute(client, message, args, Discord, profileData) {
    const newEmbed = new Discord.MessageEmbed()
      .setColor("#304281")
      .setTitle(`Useful Resources`)
      .setDescription("Our website contains all the info you need!")
      .addFields(
        { name: "Homepage", value: "https://churro.gg/" },
        { name: "Invite Links", value: "!invite" },
        { name: "Check Bankroll", value: "!bankroll" },
        { name: "ETH Deposit Address", value: "!deposit" },
        { name: "Lootbox Link", value: "!lootbox" },
        { name: "Your Account", value: "https://churro.gg/account" },
        { name: "Refresh Bankroll", value: "!refresh" },
        { name: "Command/Bets", value: "https://churro.gg/bets" },
        { name: "Open Bets", value: "!mybets" },
        { name: "Claim Winnings", value: "!claim" },
        { name: "Contact", value: `contact@churro.gg` },
        { name: "T&C", value: "https://churro.gg/terms" }
      )
      .setURL("https://churro.gg/bets");
    message.channel.send(newEmbed);
  },
};
