const profileModel = require("../../models/profileSchema");
const Discord = require("discord.js");

module.exports = async (client, discord, member) => {
  /*let profile = await profileModel.create({
    userID: member.id,
    username: member.user.tag,
    serverID: member.guild.id,
    tokens: 1000,
  });
  if (member.guild.id == '869141664529272842') {
    member.roles.add('869270405242847363');
  }*/
  const newEmbed = new Discord.MessageEmbed()
    .setColor("#304281")
    .setTitle(`Welcome to Churro, ${member.user.username}!`)
    .setThumbnail(`https://altvaton.sirv.com/Images/churros.png`)
    .setDescription(
      `Our bot allows you to bet on major NBA and Soccer matches. We give you 1000 free tokens or you can deposit ETH for more! 
      \nYou can access the list of commands on our website ([getmeow.gg/bets](https://getmeow.gg/bets)) along with the latest events you can bet on.`
    )
    .setURL("https://getmeow.gg/bets");
  member.user.send(newEmbed);
  profile.save();
};
