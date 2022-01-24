module.exports = {
  name: "bankroll",
  description: "check bankroll",
  execute(client, message, args, Discord, profileData) {
    const newEmbed = new Discord.MessageEmbed()
      .setColor("#304281")
      .setTitle(`Your Bankroll`)
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ format: "png", dynamic: true })
      )
      .setDescription("Your current bankroll")
      .setThumbnail("https://altvaton.sirv.com/Images/gem-stone_1f48e.png")
      .addFields({ name: "Bankroll", value: profileData.tokens.toFixed(2) })
      .setURL("https://getmeow.gg/tokens");
    message.channel.send(newEmbed);
  },
};
