const Profile = require("../models/profileSchema");

module.exports = {
  name: "black",
  cooldown: 1,
  description:
    "Simply Blackjack. Test your skills and luck!",
  execute(client, message, args, Discord, profileData) {
    min = Math.ceil(1);
    max = Math.floor(13);
    min1 = Math.ceil(16);
    max1 = Math.floor(21);
    const amt = args[0];
    const dealer_hand = Math.floor(Math.random() * (max1 - min1) + min1);
    const card1 = Math.floor(Math.random() * (max - min) + min);
    const card2 = Math.floor(Math.random() * (max - min) + min);
    const cards = ["A", "1","2","3","4","5","6","7","8","9","10","J","Q", "K"];
    const dealt1 = cards[card1]
    const dealt2 = cards[card2]
    const total_cards = 0
    const card_deck = []

    
    if (!amt) {
      return message.channel.send(
        `Please provide the amount of tokens you want to bet.`
      );
    }
    const newEmbed = new Discord.MessageEmbed()
      .setColor("#304281")
      .setTitle(`${message.author.username}'s Blackjack Round`)
      .setDescription(
        `Your cards are ${dealt1}, ${dealt2} \n
        Hit or Stay?\n`
      )
      .setURL("http://localhost:3000/casino");
    const filter = (m) => m.author.id === message.author.id;
    message.channel.send(newEmbed);
    card_deck.push(dealt1);
    card_deck.push(dealt2);
    message.channel
      .awaitMessages(filter, { max: 1, time:15000 })
      .then((collected) => {
        console.log(collected);
        const messageReceived1 = collected.first().content;
        const messageReceived = String(messageReceived1).toLowerCase();
        if (
          messageReceived != "hit" &&
          messageReceived != "stay" 
        ) {
          return message.channel.send(
            `The response was not one of either "hit' or "stay". \n Please re-enter the command.`
          );
        }
        const coinz = profileData.coins;
        if (messageReceived == "hit") {
          const card2 = Math.floor(Math.random() * (max - min) + min);
          const additional = cards[card2];
          card_deck.push(additional)
          card_deck.forEach((element) => {
            if(element== "A"){
              const total_cards = total_cards + 1;
            } if(element==("J" || "Q" || "K")) {
              const total_cards = total_cards + 10;
            }
            else{
              const total_cards = total_cards + parseInt(element);
            }
          })
          if (total_cards >= 20 || total_cards > dealer_hand){
            return message.channel.send(
              `Good So Far. U Won!`
            );
          } else{
            return message.channel.send(`Play some more!?!?`);
          }
        } 
        //  WORKING ON MAKING SURE THE CARD DECK IS NOT OVER 21 AND MAKING SURE ITS ALL GUCCI
        else {
          return message.channel.send(
            `also so far so good.`
          );

        }

      }
      )}
  }

/*



        if (messageReceived == "LOW" && chances < hint) {
          Profile.findOneAndUpdate(
            { userID: message.author.id },
            { coins: amt * 1.5 + coinz },
            (err, user) => {
              if (err) {
                return console.log(err);
              }
            }
          );
          const newEmbed = new Discord.MessageEmbed()
            .setColor("#304281")
            .setTitle(`Low was Right!`)
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
        if (messageReceived == "BINGO" && chances == hint) {
          Profile.findOneAndUpdate(
            { userID: message.author.id },
            { coins: amt * 1.5 + coinz },
            (err, user) => {
              if (err) {
                return console.log(err);
              }
            }
          );
          const newEmbed = new Discord.MessageEmbed()
            .setColor("#304281")
            .setTitle(`Bingo was Right!`)
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
          return message.channel.send("ILOVEYOU BUT U GOT IT WRONG...");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};*/
