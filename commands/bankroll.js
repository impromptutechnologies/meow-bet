module.exports = {
  name: "bankroll",
  description: "check bankroll",
  execute(client, message, args, Discord, profileData) {
    const newEmbed = new Discord.MessageEmbed()
      .setColor("#304281")
      .setTitle(`Your Bankroll`)
      .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
      .setDescription("Your current bankroll")
      .setThumbnail('https://altvaton.sirv.com/Images/187021818_235092514616298_5622261190586926658_n.png')
      .addFields({ name: "Bankroll", value: profileData.coins.toFixed(2) })
    message.channel.send(newEmbed);
  },
};
