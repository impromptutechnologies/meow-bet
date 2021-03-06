const Discord = require("discord.js");

module.exports = async (client, discord, guild) => {
  let channeltoSend;
  guild.channels.cache.forEach((channel) => {
    if (
      channel.type === "text" &&
      !channeltoSend &&
      channel.permissionsFor(guild.me).has("SEND_MESSAGES")
    )
      channeltoSend = channel;
  });
  if (!channeltoSend) return;
  const newEmbed = new Discord.MessageEmbed()
    .setColor("#304281")
    .setTitle(`Welcome to Churro!`)
    .setThumbnail(`https://altvaton.sirv.com/Images/churros.png`)
    .setDescription(
      `Our bot allows you to bet on major NBA and Soccer matches. We give you 1000 free Gems 💎 or you can deposit ETH/Buy a Lootbox for more! 
      \nYou can access the list of commands on our website ([churro.gg/bets](https://churro.gg/bets)) along with the latest events you can bet on.`
    )
    .setURL("https://churro.gg/bets");
  channeltoSend.send(newEmbed).catch((e) => {
    if (e) {
      return;
    }
  });
};
