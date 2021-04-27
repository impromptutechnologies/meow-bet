const profileModel = require('../../models/profileSchema');
const Discord = require("discord.js");

module.exports = async (client, discord, member) => {
    let profile = await profileModel.create({
        userID: member.id,
        username: member.user.tag,
        serverID: member.guild.id,
        coins: 0,
    });
    const newEmbed = new Discord.MessageEmbed()
      .setColor("#304281")
      .setTitle(`Welcome to Meow Bot, ${member.user.username}!`)
      .setDescription(`Our bot allows you to bet on major sports matches, stock/crypto prices, 
      and a host of cool casino games such as blackjack, dice, slots and more!\nTo earn tokens, watch a short video ad on our website, or purchase a lootbox containing tokens and access to premium commands. 
      Trust us, its worth it.\nWe've given you 10 tokens to play around with and you can access the list of commands on our website ([meowbot.gg/bets](http://localhost:3000/bets)) 
      along with the latest events you can bet on.\nP.S You can just bet via the private DM if you're shy :)
       `)
      .setFooter("visit [Click here](http://localhost:3000/tokens) to earn tokens!")
      .setURL("http://localhost:3000/bet");
      member.user.send(newEmbed)
    profile.save();
}