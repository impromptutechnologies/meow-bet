const Profile = require("../models/profileSchema");

module.exports = {
    name: "salary",
    description: "salary",
    execute(client, message, args, Discord, profileData) {
    if(profileData.lastTransaction == "yes"){
        const newEmbed = new Discord.MessageEmbed()
        .setColor("#304281")
        .setTitle(`Weekly Salary Already Paid!`)
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
        .setTitle(`Your Weekly Salary Paid!`)
        .setDescription('500 💎 Paid Out. Enter !bankroll to check.')
        .setURL("https://churro.gg/");
      message.channel.send(newEmbed);
    }
      
    },
  };