
const Bet = require("../models/betSchema");
const Invest = require("../models/investSchema");
const Profile = require("../models/profileSchema");
const getEthBalance = require("../utils/getEthBalance");





  module.exports = {
    name: "ethbal",
    description: "ethbal",
    execute(client, message, args, Discord, profileData) {




      getEthBalance("0x976683dd1def30018060669965061a8c2b97001e", async (data) => {
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
  