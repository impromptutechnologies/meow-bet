module.exports = {
    name: "status",
    description: "status commands",
    execute(client, message, args, Discord, profileData) {
       if (message.guild.id == '869141664529272842' && profileData.payments[0]) {
            message.member.roles.add('869269998013652993');
            message.member.roles.remove('869270405242847363');
       }
      const newEmbed = new Discord.MessageEmbed()
        .setColor("#304281")
        .setTitle(`Thank You!`)
        .setDescription("Thank you for purchasing a lootbox. Your role has been upgraded to Noble.")
        .setURL("https://getmeow.gg/tokens");
      message.channel.send(newEmbed);
    },
  };
  