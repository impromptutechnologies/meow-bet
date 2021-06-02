module.exports = {
    name: "help",
    description: "help commands",
    execute(client, message, args, Discord, profileData) {
      const newEmbed = new Discord.MessageEmbed()
        .setColor("#304281")
        .setTitle(`Useful Resources`)
        .setDescription("Our website contains all the info you need!")
        .addFields({ name: "Check Bankroll", value: "!bankroll" }, { name: "Command/Bets", value: "localhost:3000/bets" },{ name: "Get Tokens", value: "localhost:3000/tokens" },
        { name: "Contact", value: `http://localhost:3000/contact` }, { name: "T&C", value: "localhost:3000/terms" })
        .setFooter("visit http://localhost:3000/tokens to earn tokens!")
        .setURL("http://localhost:3000/bet")
      message.channel.send(newEmbed);
    },
  };
  