module.exports = {
    name: "deposit",
    description: "Deposit Address",
    execute(client, message, args, Discord, profileData) {
      const newEmbed = new Discord.MessageEmbed()
        .setColor("#304281")
        .setTitle(`Your ETH Deposit Address`)
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ format: "png", dynamic: true })
        )
        .setDescription("Enter !refresh after you deposit ETH to update your tokens!")
        .setThumbnail("https://altvaton.sirv.com/Images/coin.png")
        .addFields({ name: "Ethereum Deposit Address", value: profileData.depositAddress })
        .setURL("https://getmeow.gg/tokens");
      message.channel.send(newEmbed);
    },
  };
  