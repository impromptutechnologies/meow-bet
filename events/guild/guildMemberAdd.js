const profileModel = require('../../models/profileSchema');
const Discord = require("discord.js");

module.exports = async (client, discord, member) => {
    let profile = await profileModel.create({
        userID: member.id,
        username: member.user.tag,
        serverID: member.guild.id,
        coins: 100,
    });
    const newEmbed = new Discord.MessageEmbed()
      .setColor("#304281")
      .setTitle(`Welcome to Meow, ${member.user.username}!`)
      .setDescription(`Our bot allows you to bet on major sports matches, stock/crypto prices, 
      and a host of cool casino games such as blackjack, dice, slots and more!\nTo earn tokens, watch a short video ad on our website, or purchase a lootbox containing tokens and access to premium commands. 
      Trust us, its worth it.\nWe've given you 10 tokens to play around with and you can access the list of commands on our website ([meowmeow.gg/bets](http://meow-web.herokuapp.com)) along with the latest events you can bet on.`)
      .setURL("http://localhost:3000/bet");
      member.user.send(newEmbed)
    profile.save();
}