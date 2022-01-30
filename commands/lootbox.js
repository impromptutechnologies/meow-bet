
const Bet = require("../models/betSchema");
const Invest = require("../models/investSchema");
const Profile = require("../models/profileSchema");
const getEthBalance = require("../utils/getEthBalance");





  module.exports = {
    name: "lootbox",
    description: "lootbox",
    execute(client, message, args, Discord, profileData) {
    const newEmbed = new Discord.MessageEmbed()
    .setColor("#304281")
    .setTitle(`Buy a lootbox here`)
    .setDescription("churro.gg/lootbox")
    .addFields(
      { name: "here", value: data },
    )
    .setURL("https://churro.gg/lootbox");
  message.channel.send(newEmbed);
    },
  };
  