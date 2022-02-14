const Profile = require("../models/profileSchema");

module.exports = {
    name: "downbad",
    description: "downbad",
    execute(client, message, args, Discord, profileData) {
    if(profileData.lastTransaction == "yes"){
        const newEmbed = new Discord.MessageEmbed()
        .setColor("#304281")
        .setTitle(`You ain't broke!`)
        .setURL("https://churro.gg/");
      message.channel.send(newEmbed);
    }   else{
        const portfolio = Profile.findOneAndUpdate(
            {
              customerID: profileData.customerID,
            },
               { $inc: { tokens: +500 }, lastTransaction: "yes"  }
          , (req, res) => {
          });
          const newEmbed = new Discord.MessageEmbed()
        .setColor("#304281")
        .setTitle(`Here you go. Pick yourself up :)`)
        .setDescription('500 💎 to help you out. Enter !bankroll to check.')
        .setURL("https://churro.gg/");
      message.channel.send(newEmbed);
    }
      
    },
  };