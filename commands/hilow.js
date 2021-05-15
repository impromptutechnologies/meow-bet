const Profile = require("../models/profileSchema");
module.exports = {
  name: "hilow",
  cooldown: 15,
  description:
    "Guess whether a number is higher or lower relative to the hint.",
  execute(client, message, args, Discord, profileData) {
    min = Math.ceil(1);
    max = Math.floor(101);
    const amt = args[0];
    if(isNaN(amt)){
      return message.channel.send(
        `That's not a number`
      );
    }
    if (!amt) {
      return message.channel.send(
        `Please provide the amount of tokens you want to bet.`
      );
    }
    if (amt >= profileData.coins) {
      return message.channel.send(
        `Ur too broke....`
      );
    }
    
    const chances = Math.floor(Math.random() * (max - min) + min);
    console.log(chances);
    min1 = Math.ceil(50);
    max1 = Math.floor(70);
    const hint = Math.floor(Math.random() * (max1 - min1) + min1);
    const newEmbed = new Discord.MessageEmbed()
      .setColor("#304281")
      .setTitle(`High Low Game`)
      .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
      .setDescription(
        `A random number between 1-100 has been generated. Your hint is ${hint}, Respond with "High", "Low", or "Bingo".\n
    Choose whether you think the hidden number is higher, lower, or the same number as the hint.`
      )
      .setURL("http://localhost:3000/casino");
    const filter = (m) => m.author.id === message.author.id;
    message.channel.send(newEmbed);
    message.channel
      .awaitMessages(filter, { max: 1, time:10000})
      .then((collected) => {
        const messageReceived1 = collected.first().content;
        const messageReceived = String(messageReceived1).toLowerCase();
        if (
          messageReceived != "high" &&
          messageReceived != "low" &&
          messageReceived != "bingo"
        ) {
          return message.channel.send(
            `The response was not one of either "HIGH', "LOW", or "BINGO". \n Please re-enter the command.`
          );
        }
        const coinz = profileData.coins;
        if (messageReceived == "high" && chances > hint) {
          Profile.findOneAndUpdate(
            { userID: message.author.id },
            { coins: ((amt * 1.4)-amt) + coinz },
            (err, user) => {
              if (err) {
                return console.log(err);
              }
            }
          );
          const newEmbed = new Discord.MessageEmbed()
            .setColor("#304281")
            .setTitle(`High was Right!`)
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
            .setDescription(
              `Correctly guessed that ${chances} was higher than ${hint}!`
            )
            .addFields(
              { name: "Bet Amount", value: amt },
              { name: "Winnings", value: (amt * 1.5).toFixed(2) },
              { name: "Profit", value: (amt * 1.5 - amt).toFixed(2) }
            )
            .setFooter(
              "visit http://localhost:3000/casino to view more casino games!"
            )
            .setURL("http://localhost:3000/casino");
          return message.channel.send(newEmbed);
        }
        if (messageReceived == "low" && chances < hint) {
          Profile.findOneAndUpdate(
            { userID: message.author.id },
            { coins: ((amt * 1.5)-amt) + coinz},
            (err, user) => {
              if (err) {
                return console.log(err);
              }
            }
          );
          const newEmbed = new Discord.MessageEmbed()
            .setColor("#304281")
            .setTitle(`Low was Right!`)
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
            .setDescription(
              `Correctly guessed that ${chances} was lower than ${hint}!`
            )
            .addFields(
              { name: "Bet Amount", value: amt },
              { name: "Winnings", value: (amt * 1.5).toFixed(2) },
              { name: "Profit", value: (amt * 1.5 - amt).toFixed(2) }
            )
            .setFooter(
              "visit http://localhost:3000/casino to view more casino games!"
            )
            .setURL("http://localhost:3000/casino");
          return message.channel.send(newEmbed);
        }
        if (messageReceived == "bingo" && chances == hint) {
          Profile.findOneAndUpdate(
            { userID: message.author.id },
            { coins: ((amt * 1.5)-amt) + coinz},
            (err, user) => {
              if (err) {
                return console.log(err);
              }
            }
          );
          const newEmbed = new Discord.MessageEmbed()
            .setColor("#304281")
            .setTitle(`Bingo was Right!`)
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
            .setDescription(
              `Correctly guessed that ${chances} is equal to ${hint}!`
            )
            .addFields(
              { name: "Bet Amount", value: amt },
              { name: "Winnings", value: (amt * 7.5).toFixed(2) },
              { name: "Profit", value: (amt * 7.5 - amt).toFixed(2) }
            )
            .setFooter(
              "visit http://localhost:3000/casino to view more casino games!"
            )
            .setURL("http://localhost:3000/casino");
          return message.channel.send(newEmbed);
        } else {
          Profile.findOneAndUpdate(
            { userID: message.author.id },
            { coins: coinz-amt},
            (err, user) => {
              if (err) {
                return console.log(err);
              }
            }
          );
          return message.channel.send("ILOVEYOU BUT U GOT IT WRONG...");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
