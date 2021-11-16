/*module.exports = {
  name: "upgrade",
  description: "upgrade role",
  execute(client, message, args, Discord, profileData) {
    if (message.guild.id == "869141664529272842" && profileData.payments[0]) {
      message.member.roles.add("869269998013652993");
      message.member.roles.remove("869270405242847363");
      const newEmbed = new Discord.MessageEmbed()
        .setColor("#304281")
        .setTitle(`Thank You!`)
        .setDescription(
          "Thank you for purchasing a lootbox. Your role has been upgraded to Duke."
        )
        .setURL("https://getmeow.gg/tokens");
      message.channel.send(newEmbed);
    }else{
        const newEmbed = new Discord.MessageEmbed()
        .setColor("#304281")
        .setTitle(`Please Purchase Lootbox`)
        .setDescription(
          "Purchase a lootbox at getmeow.gg/tokens in order to become a Duke."
        )
        .setURL("https://getmeow.gg/tokens");
      message.channel.send(newEmbed);
    }
  },
};*/
