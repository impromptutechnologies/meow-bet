module.exports = {
    name: "deposit",
    description: "Deposit Address",
    execute(client, message, args, Discord, profileData) {
      if(!profileData.depositAddress){
        const newEmbed = new Discord.MessageEmbed()
        .setColor("#304281")
        .setTitle(`ETH Deposit Address`)
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ format: "png", dynamic: true })
        )
        .setDescription("Login via discord at churro.gg/account to check your new address!")
        .setThumbnail("https://altvaton.sirv.com/Images/gem-stone_1f48e.png")
        .setURL("https://churro.gg/lootbox");
        message.channel.send(newEmbed);
      }else{
        const newEmbed = new Discord.MessageEmbed()
        .setColor("#304281")
        .setTitle(`ETH Deposit Address`)
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ format: "png", dynamic: true })
        )
        .setDescription("Enter !bankroll after you deposit ETH to update your Gems 💎!")
        .setThumbnail("https://altvaton.sirv.com/Images/gem-stone_1f48e.png")
        .addFields({ name: "Ethereum Deposit Address", value: profileData.depositAddress })
        .setURL("https://churro.gg/lootbox");
        message.channel.send(newEmbed);
      }
      
    },
  };
  