module.exports = {
    name: "invite",
    description: "invite",
    execute(client, message, args, Discord, profileData) {
      const newEmbed = new Discord.MessageEmbed()
        .setColor("#304281")
        .setTitle(`Bot Invite Link`)
        .setDescription("https://discord.com/oauth2/authorize?client_id=834305925669584896&permissions=268511264&scope=bot")
      message.channel.send(newEmbed);
    },
  };
  