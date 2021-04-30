module.exports = {
  name: "bankroll",
  description: "check bankroll",
  execute(client, message, args, Discord, profileData) {
    const newEmbed = new Discord.MessageEmbed()
      .setColor("#304281")
      .setTitle(`Your Bankroll`)
      .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
      .setDescription("Your current bankroll")
      .addFields({ name: "Bankroll", value: profileData.coins.toFixed(2) })
      .setFooter("visit http://localhost:3000/tokens to earn tokens!")
      .setURL("http://localhost:3000/bet");
    message.channel.send(newEmbed);
  },
};
