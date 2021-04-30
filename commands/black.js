const Profile = require("../models/profileSchema");

module.exports = {
  name: "black",
  cooldown: 1,
  description: "Simply Blackjack. Test your skills and luck!",
  execute(client, message, args, Discord, profileData) {
    min = Math.ceil(1);
    max = Math.floor(13);
    min1 = Math.ceil(16);
    max1 = Math.floor(21);
    const coinz = profileData.coins;
    const amt = args[0];
    const dealer_hand = Math.floor(Math.random() * (max1 - min1) + min1);
    const card1 = Math.floor(Math.random() * (max - min) + min);
    const card2 = Math.floor(Math.random() * (max - min) + min);
    const cards = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "10",
      "10",
      "10",
    ];
    const dealt1 = cards[card1];
    const dealt2 = cards[card2];
    const total_cards = 0;
    const card_deck = [];

    if (!amt) {
      return message.channel.send(
        `Please provide the amount of tokens you want to bet.`
      );
    }
    if (amt >= profileData.coins) {
      return message.channel.send(`Ur too broke....`);
    }
    const newEmbed = new Discord.MessageEmbed()
      .setColor("#304281")
      .setTitle(`Blackjack Round`)
      .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
      .setDescription(
        `Your cards are ${dealt1}, ${dealt2} \nHit or Stay?\nps. 5 Card Charlie Rules: If you're dealt 5 cards without a bust you automatically win!
        `
      )
      .setURL("http://localhost:3000/casino")
      .setImage(
        "https://i2.wp.com/www.thexboxhub.com/wp-content/uploads/2021/03/kaysha-V3qzwMY2ak0-unsplash.jpg?fit=640%2C481&ssl=1"
      );
    const filter = (m) => m.author.id === message.author.id;
    message.channel.send(newEmbed);
    card_deck.push(dealt1);
    card_deck.push(dealt2);
    message.channel
      .awaitMessages(filter, { max: 1, time: 15000 })
      .then((collected) => {
        const messageReceived1 = collected.first().content;
        const messageReceived = String(messageReceived1).toLowerCase();
        if (messageReceived != "hit" && messageReceived != "stay") {
          return message.channel.send(
            `The response was not one of either "hit" or "stay". \n Please re-enter the command.`
          );
        }
        const coinz = profileData.coins;
        let total = parseInt(dealt1) + parseInt(dealt2);
        if (messageReceived == "hit") {
          const card2 = Math.floor(Math.random() * (max - min) + min);
          const additional = cards[card2];
          card_deck.push(additional);
          console.log(card_deck);
          let total = 0;
          card_deck.forEach((element) => {
            total = total + parseInt(element);
          });
          if (total == 21 && dealer_hand != 21) {
            Profile.findOneAndUpdate(
              { userID: message.author.id },
              { coins: ((amt * 1.3) - amt) + coinz },
              (err, user) => {
                if (err) {
                  return console.log(err);
                }
              }
            );
            const newEmbed = new Discord.MessageEmbed()
              .setColor("#304281")
              .setTitle(`You Won!`)
              .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
              .setDescription(
                `Your total was ${total}\nYou Won ${((amt * 1.3) - amt).toFixed(2)} tokens!`
              )
              .setURL("http://localhost:3000/casino")
              .setImage(
                "https://i2.wp.com/www.thexboxhub.com/wp-content/uploads/2021/03/kaysha-V3qzwMY2ak0-unsplash.jpg?fit=640%2C481&ssl=1"
              );

            return message.channel.send(newEmbed);
          }
          if (total > 21) {
            const newEmbed = new Discord.MessageEmbed()
              .setColor("#304281")
              .setTitle(`Bust!`)
              .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
              .setDescription(`Your total was ${total}!`)
              .setURL("http://localhost:3000/casino")
              .setImage(
                "https://i2.wp.com/www.thexboxhub.com/wp-content/uploads/2021/03/kaysha-V3qzwMY2ak0-unsplash.jpg?fit=640%2C481&ssl=1"
              );

            return message.channel.send(newEmbed);
          }
          const newEmbed = new Discord.MessageEmbed()
              .setColor("#304281")
              .setTitle(`Make your Choice!`)
              .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
              .setDescription(`Your total is ${total}!\nHit or Stay?`)
              .setURL("http://localhost:3000/casino")
              .setImage(
                "https://i2.wp.com/www.thexboxhub.com/wp-content/uploads/2021/03/kaysha-V3qzwMY2ak0-unsplash.jpg?fit=640%2C481&ssl=1"
              );
          message.channel.send(newEmbed);
          message.channel
            .awaitMessages(filter, { max: 1, time: 15000 })
            .then((collected) => {
              const messageReceived1 = collected.first().content;

              if (String(messageReceived1).toLowerCase() == "hit") {
                const card3 = Math.floor(Math.random() * (max - min) + min);
                const additional = cards[card3];
                card_deck.push(additional);
                console.log(card_deck);
                let total = 0;
                card_deck.forEach((element) => {
                  total = total + parseInt(element);
                });
                if (total >= 20 && total < 22 && total > dealer_hand) {
                  Profile.findOneAndUpdate(
                    { userID: message.author.id },
                    { coins: ((amt * 1.3) - amt) + coinz },
                    (err, user) => {
                      if (err) {
                        return console.log(err);
                      }
                    }
                  );
                  const newEmbed = new Discord.MessageEmbed()
                    .setColor("#304281")
                    .setTitle(`You Won!`)
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                    .setDescription(
                      `Your total was ${total}\nYou Won ${
                        ((amt * 1.3) - amt).toFixed(2)
                      } tokens!`
                    )
                    .setURL("http://localhost:3000/casino")
                    .setImage(
                      "https://i2.wp.com/www.thexboxhub.com/wp-content/uploads/2021/03/kaysha-V3qzwMY2ak0-unsplash.jpg?fit=640%2C481&ssl=1"
                    );

                  return message.channel.send(newEmbed);
                } else {
                  if (total > 21) {
                    Profile.findOneAndUpdate(
                      { userID: message.author.id },
                      { coins: coinz - amt },
                      (err, user) => {
                        if (err) {
                          return console.log(err);
                        }
                      }
                    );
                    const newEmbed = new Discord.MessageEmbed()
                      .setColor("#304281")
                      .setTitle(`Bust!`)
                      .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                      .setDescription(`Your total was ${total}!`)
                      .setURL("http://localhost:3000/casino")
                      .setImage(
                        "https://i2.wp.com/www.thexboxhub.com/wp-content/uploads/2021/03/kaysha-V3qzwMY2ak0-unsplash.jpg?fit=640%2C481&ssl=1"
                      );

                    return message.channel.send(newEmbed);
                  }
                  const newEmbed = new Discord.MessageEmbed()
                  .setColor("#304281")
                  .setTitle(`Make your Choice!`)
                  .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                  .setDescription(`Your total is ${total}!\nHit or Stay?`)
                  .setURL("http://localhost:3000/casino")
                  .setImage(
                    "https://i2.wp.com/www.thexboxhub.com/wp-content/uploads/2021/03/kaysha-V3qzwMY2ak0-unsplash.jpg?fit=640%2C481&ssl=1"
                  );
                  message.channel.send(newEmbed);

                  message.channel
                    .awaitMessages(filter, { max: 1, time: 15000 })
                    .then((collected) => {
                      const messageReceived1 = collected.first().content;
                      const messageReceived = String(
                        messageReceived1
                      ).toLowerCase();

                      if (messageReceived == "hit") {
                        const card4 = Math.floor(
                          Math.random() * (max - min) + min
                        );
                        const additional3 = cards[card4];
                        card_deck.push(additional3);
                        console.log(card_deck);
                        let total = 0;
                        card_deck.forEach((element) => {
                          total = total + parseInt(element);
                        });
                        if (total == 21 && dealer_hand != 21) {
                          Profile.findOneAndUpdate(
                            { userID: message.author.id },
                            { coins: ((amt * 1.3) - amt) + coinz },
                            (err, user) => {
                              if (err) {
                                return console.log(err);
                              }
                            }
                          );
                          const newEmbed = new Discord.MessageEmbed()
                    .setColor("#304281")
                    .setTitle(`You Won!`)
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                    .setDescription(
                      `Your total was ${total}\nYou Won ${
                        ((amt * 1.3) - amt).toFixed(2)
                      } tokens!`
                    )
                    .setURL("http://localhost:3000/casino")
                    .setImage(
                      "https://i2.wp.com/www.thexboxhub.com/wp-content/uploads/2021/03/kaysha-V3qzwMY2ak0-unsplash.jpg?fit=640%2C481&ssl=1"
                    );

                  return message.channel.send(newEmbed);
                        }
                        if (total > 21) {
                          Profile.findOneAndUpdate(
                            { userID: message.author.id },
                            { coins: coinz - amt },
                            (err, user) => {
                              if (err) {
                                return console.log(err);
                              }
                            }
                          );
                          const newEmbed = new Discord.MessageEmbed()
                      .setColor("#304281")
                      .setTitle(`Bust!`)
                      .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                      .setDescription(`Your total was ${total}!`)
                      .setURL("http://localhost:3000/casino")
                      .setImage(
                        "https://i2.wp.com/www.thexboxhub.com/wp-content/uploads/2021/03/kaysha-V3qzwMY2ak0-unsplash.jpg?fit=640%2C481&ssl=1"
                      );

                    return message.channel.send(newEmbed);
                        }
                        if (total < 21) {
                          Profile.findOneAndUpdate(
                            { userID: message.author.id },
                            { coins: ((amt * 1.3) - amt) + coinz },
                            (err, user) => {
                              if (err) {
                                return console.log(err);
                              }
                            }
                          );
                          const newEmbed = new Discord.MessageEmbed()
                    .setColor("#304281")
                    .setTitle(`You Won!`)
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                    .setDescription(
                      `5 Card Charlie Rule! You got dealt 5 cards without reaching 21. \nYou Won ${
                        ((amt * 1.3) - amt).toFixed(2)
                      } tokens!`
                    )
                    .setURL("http://localhost:3000/casino")
                    .setImage(
                      "https://i2.wp.com/www.thexboxhub.com/wp-content/uploads/2021/03/kaysha-V3qzwMY2ak0-unsplash.jpg?fit=640%2C481&ssl=1"
                    );

                  return message.channel.send(newEmbed);
                        }
                      } else {
                        if (total == 21 && dealer_hand != 21) {
                          Profile.findOneAndUpdate(
                            { userID: message.author.id },
                            { coins: ((amt * 1.3) - amt) + coinz },
                            (err, user) => {
                              if (err) {
                                return console.log(err);
                              }
                            }
                          );
                          const newEmbed = new Discord.MessageEmbed()
                    .setColor("#304281")
                    .setTitle(`You Won!`)
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                    .setDescription(
                      `Your total was ${total}\nYou Won ${
                        ((amt * 1.3) - amt).toFixed(2)
                      } tokens!`
                    )
                    .setURL("http://localhost:3000/casino")
                    .setImage(
                      "https://i2.wp.com/www.thexboxhub.com/wp-content/uploads/2021/03/kaysha-V3qzwMY2ak0-unsplash.jpg?fit=640%2C481&ssl=1"
                    );

                  return message.channel.send(newEmbed);
                        }
                        if (total > 21) {
                          Profile.findOneAndUpdate(
                            { userID: message.author.id },
                            { coins: coinz - amt },
                            (err, user) => {
                              if (err) {
                                return console.log(err);
                              }
                            }
                          );
                          const newEmbed = new Discord.MessageEmbed()
                      .setColor("#304281")
                      .setTitle(`Bust!`)
                      .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                      .setDescription(`Your total was ${total}!`)
                      .setURL("http://localhost:3000/casino")
                      .setImage(
                        "https://i2.wp.com/www.thexboxhub.com/wp-content/uploads/2021/03/kaysha-V3qzwMY2ak0-unsplash.jpg?fit=640%2C481&ssl=1"
                      );

                    return message.channel.send(newEmbed);
                        }
                        if (total < 21 && total > dealer_hand) {
                          Profile.findOneAndUpdate(
                            { userID: message.author.id },
                            { coins: ((amt * 1.3) - amt) + coinz },
                            (err, user) => {
                              if (err) {
                                return console.log(err);
                              }
                            }
                          );
                          const newEmbed = new Discord.MessageEmbed()
                    .setColor("#304281")
                    .setTitle(`You Won!`)
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                    .setDescription(
                      `Your total was ${total}\nYou Won ${
                        ((amt * 1.3) - amt).toFixed(2)
                      } tokens!`
                    )
                    .setURL("http://localhost:3000/casino")
                    .setImage(
                      "https://i2.wp.com/www.thexboxhub.com/wp-content/uploads/2021/03/kaysha-V3qzwMY2ak0-unsplash.jpg?fit=640%2C481&ssl=1"
                    );

                  return message.channel.send(newEmbed);

                        }
                      }
                    });
                }
              }
              if (String(messageReceived1).toLowerCase() == "stay") {
                if (total > dealer_hand && total < 22) {
                  Profile.findOneAndUpdate(
                    { userID: message.author.id },
                    { coins: ((amt * 1.3) - amt) + coinz },
                    (err, user) => {
                      if (err) {
                        return console.log(err);
                      }
                    }
                  );
                  const newEmbed = new Discord.MessageEmbed()
                    .setColor("#304281")
                    .setTitle(`You Won!`)
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                    .setDescription(
                      `Your total was ${total}\nYou Won ${
                        ((amt * 1.3) - amt).toFixed(2)
                      } tokens!`
                    )
                    .setURL("http://localhost:3000/casino")
                    .setImage(
                      "https://i2.wp.com/www.thexboxhub.com/wp-content/uploads/2021/03/kaysha-V3qzwMY2ak0-unsplash.jpg?fit=640%2C481&ssl=1"
                    );

                  return message.channel.send(newEmbed);

                } else {
                  Profile.findOneAndUpdate(
                    { userID: message.author.id },
                    { coins: coinz - amt },
                    (err, user) => {
                      if (err) {
                        return console.log(err);
                      }
                    }
                  );
                  const newEmbed = new Discord.MessageEmbed()
                    .setColor("#304281")
                    .setTitle(`You've Lost`)
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                    .setDescription(
                      `Your total was ${total}\nDealer total was ${dealer_hand}!`
                    )
                    .setURL("http://localhost:3000/casino")
                    .setImage(
                      "https://i2.wp.com/www.thexboxhub.com/wp-content/uploads/2021/03/kaysha-V3qzwMY2ak0-unsplash.jpg?fit=640%2C481&ssl=1"
                    );

                  return message.channel.send(newEmbed);
                }
              }
            });
        }
        //  WORKING ON MAKING SURE THE CARD DECK IS NOT OVER 21 AND MAKING SURE ITS ALL GUCCI
        else {
          if (total > dealer_hand && total <= 21) {
            Profile.findOneAndUpdate(
              { userID: message.author.id },
              { coins: ((amt * 1.3) - amt) + coinz },
              (err, user) => {
                if (err) {
                  return console.log(err);
                }
              }
            );
            const newEmbed = new Discord.MessageEmbed()
                    .setColor("#304281")
                    .setTitle(`You Won!`)
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                    .setDescription(
                      `Your total was ${total}\nYou Won ${
                        ((amt * 1.3) - amt).toFixed(2)
                      } tokens!`
                    )
                    .setURL("http://localhost:3000/casino")
                    .setImage(
                      "https://i2.wp.com/www.thexboxhub.com/wp-content/uploads/2021/03/kaysha-V3qzwMY2ak0-unsplash.jpg?fit=640%2C481&ssl=1"
                    );

                  return message.channel.send(newEmbed);
          } else {
            Profile.findOneAndUpdate(
              { userID: message.author.id },
              { coins: coinz - amt },
              (err, user) => {
                if (err) {
                  return console.log(err);
                }
              }
            );
            const newEmbed = new Discord.MessageEmbed()
                    .setColor("#304281")
                    .setTitle(`Better luck next time!`)
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                    .setDescription(
                      `Your total was ${total}\nDealer total was ${dealer_hand}!`
                    )
                    .setURL("http://localhost:3000/casino")
                    .setImage(
                      "https://i2.wp.com/www.thexboxhub.com/wp-content/uploads/2021/03/kaysha-V3qzwMY2ak0-unsplash.jpg?fit=640%2C481&ssl=1"
                    );

                  return message.channel.send(newEmbed);

          }
        }
      });
  },
};

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
