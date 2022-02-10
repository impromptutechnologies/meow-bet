module.exports = {
  name: "help",
  description: "help commands",
  execute(client, message, args, Discord, profileData) {
    const newEmbed = new Discord.MessageEmbed()
      .setTitle(`Useful Resources`)
      .setDescription("Our website contains all the info you need!")
      .addFields(
        { name: "Homepage", value: "https://churro.gg/" },
        { name: "Invite Link", value: "!invite" },
        { name: "Check Bankroll", value: "!bankroll" },
        { name: "Invest Command", value: "!invest day AAPL" },
        //{ name: "ETH Deposit Address", value: "!deposit" },
        { name: "Lootbox Link", value: "!lootbox" },
        { name: "Open Invests", value: "!myinvests" },
        { name: "Claim Winnings", value: "!claim" },
        { name: "Your Account", value: "https://churro.gg/account" },
        //{ name: "Refresh Bankroll", value: "!refresh" },
       
        { name: "Contact", value: `contact@churro.gg` },
        { name: "T&C", value: "https://churro.gg/terms" }
      )
    message.channel.send(newEmbed);
  },
};
