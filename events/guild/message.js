require("dotenv").config();
const Profile = require("../../models/profileSchema");
const Bet = require("../../models/betSchema");
const Discord = require("discord.js");
const cooldown = new Map();

module.exports = async (Discord, client, message) => {
  const prefix = process.env.PREFIX;
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  let profileData;
  try {
    profileData = await Profile.findOne({ userID: message.author.id }).lean();
    if (!profileData) {
      console.log(message.guild.id)
      let profile = await Profile.create({
        userID: message.author.id,
        username: message.author.tag,
        serverID: message.guild.id,
        coins: 1000,
      });
      const newEmbed = new Discord.MessageEmbed()
      .setColor("#304281")
      .setTitle(`Welcome to Meow, ${message.author.username}!`)
      .setThumbnail(`https://altvaton.sirv.com/Images/heart.png`)
      .setDescription(`Our bot allows you to bet on major sports matches, stock/crypto prices, and a host of cool casino games such as blackjack, dice, slots and more! We give you 100 free tokens a day or you can purchase a lootbox containing tokens, premium commands and the monthly giveaway/lottery. 
      \nYou can access the list of commands on our website ([meowmeow.gg/bets](http://meow-web.herokuapp.com)) along with the latest events you can bet on.`)
      .setURL("http://localhost:3000/bet");
      message.author.send(newEmbed)
      profile.save();
    }
  } catch (err) {
    console.log(err);
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  const command = client.commands.get(cmd);
  if (!cooldown.has(command.name)) {
    cooldown.set(command.name, new Discord.Collection());
  }

  const current_time = Date.now();
  const time_stamps = cooldown.get(command.name);
  const cooldown_time = command.cooldown * 1000;

  if (time_stamps.has(message.author.id)) {
    const expiration_time = time_stamps.get(message.author.id) + cooldown_time;
    if (current_time < expiration_time) {
      const time_left = (expiration_time - current_time) / 1000;
      return message.reply(
        `Please wait: ${time_left.toFixed(
          1
        )} seconds before sending another command (Spam prevention)`
      );
    }
  }
  time_stamps.set(message.author.id, current_time);
  setTimeout(() => time_stamps.delete(message.author.id), cooldown_time);
  profileData = await Profile.findOne({ userID: message.author.id });
  try {
    command.execute(client, message, args, Discord, profileData);
  } catch (err) {
    message.reply("There was an error");
    console.log(err);
  }
};
