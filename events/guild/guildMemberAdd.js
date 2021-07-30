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
    .setTitle(`Welcome to Meow, ${member.user.username}!`)
    .setThumbnail(`https://altvaton.sirv.com/Images/heart.png`)
    .setDescription(
      `Our bot allows you to bet on major sports matches, stock/crypto prices, and a host of cool casino games such as blackjack, dice, slots and more! We give you 1000 free tokens or you can purchase a lootbox containing tokens, premium commands and the monthly giveaway/lottery. 
      \nYou can access the list of commands on our website ([meowmeow.gg/bets](https://getmeow.gg/bets)) along with the latest events you can bet on. To create an account, simply enter a !bankroll or !help command.`
    )
    .setURL("https://getmeow.gg/bets");
  member.user.send(newEmbed);
  profile.save();
};
