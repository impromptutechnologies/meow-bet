module.exports = {
    name: "maintanence",
    description: "maintanence",
    execute(client, message, args, Discord, profileData) {
      const newEmbed = new Discord.MessageEmbed()
        .setColor("#304281")
        .setTitle(`Under Maintanence!`)
        .setDescription("Sorry, Churro is currently under maintanence. We'll be back shortly!")
        .setURL("https://getmeow.gg/");
      message.channel.send(newEmbed);
    },
  };
  