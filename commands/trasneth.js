
const Bet = require("../models/betSchema");
const Invest = require("../models/investSchema");
const Profile = require("../models/profileSchema");
const ethGas = require("../utils/ethGas");





  module.exports = {
    name: "transeth",
    description: "transeth",
    execute(client, message, args, Discord, profileData) {




ethGas(async (data) => {
    console.log(data)

    const newEmbed = new Discord.MessageEmbed()
    .setColor("#304281")
    .setTitle(`Useful Resources`)
    .setDescription("worked!")
    .addFields(
      { name: "here", value: data },
    )
    .setURL("https://churro.gg/bets");
  message.channel.send(newEmbed);
  });
    },
  };
  