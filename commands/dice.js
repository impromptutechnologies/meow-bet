const Profile = require("../models/profileSchema");
module.exports = {
  name: "dice",
  cooldown: 10,
  description: "Roll the dice. Get a 6 to win BIG!",
  execute(client, message, args, Discord, profileData) {
    const amt = args[0];
    min = Math.ceil(1);
    max = Math.floor(7);
    const chances = Math.floor(Math.random() * (max - min) + min);
    const winnin = 4;

    console.log(winnin);
    console.log(chances);
    const user = Profile.findOne({ userID: message.author.id }, (err, prof) => {
      if (err) {
        console.log(err);
        message.channel.send("Wrong Command...");
      }

      if (prof.coins >= amt) {
        const coinz = prof.coins;
        if (chances != 6) {
          Profile.findOneAndUpdate(
            { userID: message.author.id },
            { coins: coinz - parseInt(amt) },
            (err, user) => {
              if (err) {
                return console.log(err);
              }
              const newEmbed = new Discord.MessageEmbed()
                .setColor("#304281")
                .setTitle(`You rolled a ${chances}`)
                .setDescription("Better luck next time :(")
                .setFooter(
                  "visit http://localhost:3000/casino to view more casino games!"
                )
                .setURL("http://localhost:3000/casino");
              message.channel.send(newEmbed);
            }
          );
        } else {
          Profile.findOneAndUpdate(
            { userID: message.author.id },
            { coins: coinz + Math.floor(amt * winnin - amt) },
            (err, user) => {
              if (err) {
                return console.log(err);
              }
              const newEmbed = new Discord.MessageEmbed()
                .setColor("#304281")
                .setTitle(`Congrats ${message.author.username}!`)
                .setDescription("You managed to win! :)")
                .addFields(
                  { name: "Bet Amount", value: amt },
                  { name: "Winnings", value: (amt * winnin).toFixed(2) },
                  { name: "Profit", value: (amt * winnin - amt).toFixed(2) }
                )
                .setFooter(
                  "visit http://localhost:3000/casino to view more casino games!"
                )
                .setURL("http://localhost:3000/casino");
              message.channel.send(newEmbed);
            }
          );
        }
      }
      if (!amt) {
        message.channel.send(
          "Please provide the amount of tokens you want to bet."
        );
      }
      if (amt > prof.coins) {
        message.channel.send("you broke.");
      }
    });
  },
};
