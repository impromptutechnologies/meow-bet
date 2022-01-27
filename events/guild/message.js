require("dotenv").config();
const Profile = require("../../models/profileSchema");
const Bet = require("../../models/betSchema");
const Discord = require("discord.js");
const cooldown = new Map();
const createAccount = require("../../utils/createAccount");
const depositAddress = require("../../utils/depositAddress");
const privKey = require("../../utils/privKey");

module.exports = async (Discord, client, message) => {
  const prefix = process.env.PREFIX;
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  let profileData;
  try {
    profileData = await Profile.findOne({ userID: message.author.id });
    if (!profileData) {
      console.log(message.guild.id)
      let profile = await Profile.create({
        userID: message.author.id,
        username: message.author.tag,
        serverID: message.guild.id,
        tokens: 1000,
      });
      const newEmbed = new Discord.MessageEmbed()
      .setColor("#304281")
      .setTitle(`Welcome to Churro, ${message.author.username}!`)
      .setThumbnail(`https://altvaton.sirv.com/Images/churros.png`)
      .setDescription(`Our bot allows you to bet on Soccer and NBA matches! We give you 1000 free Gems 💎 or you can deposit ETH/Buy a Lootbox for more!. 
      You can access the list of commands on our website ([churro.gg/bets](http://meow-web.herokuapp.com)) along with the latest matches you can bet on.`)
      .setURL("http://localhost:3000/bet");
      message.author.send(newEmbed)
      profile.save();


      createAccount(
        message.author.id,
        message.author.tag,
        message.guild.id,
        (data) => {
          depositAddress(data, async (data) => {
            //console.log(data)
            privKey(
              data.customerID,
              data.depositAddress,
              data.derivationKey,
              (data) => {
                
                console.log("PrivateLEY", data);
             
              }
            );
            //return res.render('dgx3', {email: req.user.email, MAGIC_PUBLISHABLE_KEY, customerID: data.customerID, depositAddress: data.depositAddress })
          });
        }
      );


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
        )} seconds before sending this command (Spam prevention)`
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