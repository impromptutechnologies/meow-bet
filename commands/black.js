const Profile = require("../models/profileSchema");

module.exports = {
  name: "black",
  cooldown: 10,
  description: "Simply Blackjack. Test your skills and luck!",
  execute(client, message, args, Discord, profileData) {
    min = Math.ceil(0);
    max = Math.floor(9);
    min1 = Math.ceil(17);
    max1 = Math.floor(21);
    const amt = args[0];
    if (!amt || amt >= profileData.tokens || isNaN(amt)) {
      return message.channel.send(
        `Error: please check the command again or your bankroll.`
      );
    }
    if (profileData.payments[0] == null) {
      return message.channel.send(`Please purchase a lootbox to access :)`);
    }
    const coinz = profileData.tokens - amt;
    Profile.findOneAndUpdate(
      { userID: message.author.id },
      { tokens: coinz },
      (err, user) => {
        if (err) {
          return console.log(err);
        } else {
          const dealer_hand = Math.floor(Math.random() * (max1 - min1) + min1);
          const card1 = Math.floor(Math.random() * (max - min) + min);
          const card2 = Math.floor(Math.random() * (max - min) + min);
          const cards = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
          const dealt1 = cards[card1];
          const dealt2 = cards[card2];
          const card_deck = [];
          const newEmbed = new Discord.MessageEmbed()
            .setColor("#304281")
            .setTitle(`Blackjack Round`)
            .setAuthor(
              message.author.username,
              message.author.displayAvatarURL({ format: "png", dynamic: true })
            )
            .setDescription(
              `Your cards are ${dealt1}, ${dealt2} \nHit or Stay?\nps. 5 Card Charlie Rules: If you're dealt 5 cards without a bust you automatically win!
              `
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
              const coinz = user.tokens - amt;
              let total = parseInt(dealt1) + parseInt(dealt2);

              if (messageReceived == "hit") {
                const card2 = Math.floor(Math.random() * (max - min) + min);
                const additional = cards[card2];
                card_deck.push(additional);
                let total = 0;
                card_deck.forEach((element) => {
                  total = total + parseInt(element);
                });
                if (total == 21 && dealer_hand != 21) {
                  Profile.findOneAndUpdate(
                    { userID: message.author.id },
                    { tokens: amt * 1.3 + coinz },
                    (err, user) => {
                      if (err) {
                        return console.log(err);
                      }
                    }
                  );
                  const newEmbed = new Discord.MessageEmbed()
                    .setColor("#304281")
                    .setTitle(`You Won!`)
                    .setAuthor(
                      message.author.username,
                      message.author.displayAvatarURL({
                        format: "png",
                        dynamic: true,
                      })
                    )
                    .setDescription(
                      `Your total was ${total}\nYou Won ${(
                        amt * 1.3 -
                        amt
                      ).toFixed(2)} tokens!`
                    );

                  return message.channel.send(newEmbed);
                }
                if (total > 21) {
                  const newEmbed = new Discord.MessageEmbed()
                    .setColor("#304281")
                    .setTitle(`Bust!`)
                    .setAuthor(
                      message.author.username,
                      message.author.displayAvatarURL({
                        format: "png",
                        dynamic: true,
                      })
                    )
                    .setDescription(`Your total was ${total}!`);

                  return message.channel.send(newEmbed);
                }
                const newEmbed = new Discord.MessageEmbed()
                  .setColor("#304281")
                  .setTitle(`Make your Choice!`)
                  .setAuthor(
                    message.author.username,
                    message.author.displayAvatarURL({
                      format: "png",
                      dynamic: true,
                    })
                  )
                  .setDescription(`Your total is ${total}!\nHit or Stay?`);
                message.channel.send(newEmbed);
                message.channel
                  .awaitMessages(filter, { max: 1, time: 15000 })
                  .then((collected) => {
                    const messageReceived1 = collected.first().content;

                    if (String(messageReceived1).toLowerCase() == "hit") {
                      const card3 = Math.floor(
                        Math.random() * (max - min) + min
                      );
                      const additional2 = cards[card3];
                      card_deck.push(additional2);
                      let total = 0;
                      card_deck.forEach((element) => {
                        total = total + parseInt(element);
                      });
                      if (total < 22 && total > 19 && total > dealer_hand) {
                        Profile.findOneAndUpdate(
                          { userID: message.author.id },
                          { tokens: amt * 1.3 + coinz },
                          (err, user) => {
                            if (err) {
                              return console.log(err);
                            }
                          }
                        );
                        const newEmbed = new Discord.MessageEmbed()
                          .setColor("#304281")
                          .setTitle(`You Won!`)
                          .setAuthor(
                            message.author.username,
                            message.author.displayAvatarURL({
                              format: "png",
                              dynamic: true,
                            })
                          )
                          .setDescription(
                            `Your total was ${total}\nYou Won ${(
                              amt * 1.3 -
                              amt
                            ).toFixed(2)} tokens!`
                          );

                        return message.channel.send(newEmbed);
                      }
                      if (total > 21) {
                        const newEmbed = new Discord.MessageEmbed()
                          .setColor("#304281")
                          .setTitle(`Bust!`)
                          .setAuthor(
                            message.author.username,
                            message.author.displayAvatarURL({
                              format: "png",
                              dynamic: true,
                            })
                          )
                          .setDescription(`Your total was ${total}!`);

                        return message.channel.send(newEmbed);
                      }
                      const newEmbed = new Discord.MessageEmbed()
                        .setColor("#304281")
                        .setTitle(`Make your Choice!`)
                        .setAuthor(
                          message.author.username,
                          message.author.displayAvatarURL({
                            format: "png",
                            dynamic: true,
                          })
                        )
                        .setDescription(
                          `Your total is ${total}!\nHit or Stay?`
                        );
                      message.channel.send(newEmbed);

                      message.channel
                        .awaitMessages(filter, { max: 1, time: 15000 })
                        .then((collected) => {
                          const messageReceived1 = collected.first().content;
                          const messageReceived =
                            String(messageReceived1).toLowerCase();
                          if (messageReceived == "hit") {
                            const card4 = Math.floor(
                              Math.random() * (max - min) + min
                            );
                            const additional3 = cards[card4];
                            card_deck.push(additional3);
                            let total = 0;
                            card_deck.forEach((element) => {
                              total = total + parseInt(element);
                            });
                            if (total == 21 && dealer_hand != 21) {
                              Profile.findOneAndUpdate(
                                { userID: message.author.id },
                                { tokens: amt * 1.3 + coinz },
                                (err, user) => {
                                  if (err) {
                                    return console.log(err);
                                  }
                                }
                              );
                              const newEmbed = new Discord.MessageEmbed()
                                .setColor("#304281")
                                .setTitle(`Blackjack!`)
                                .setAuthor(
                                  message.author.username,
                                  message.author.displayAvatarURL({
                                    format: "png",
                                    dynamic: true,
                                  })
                                )
                                .setDescription(
                                  `Your total was ${total}\nYou Won ${(
                                    amt * 1.3 -
                                    amt
                                  ).toFixed(2)} tokens!`
                                );

                              return message.channel.send(newEmbed);
                            }
                            if (total > 21) {
                              const newEmbed = new Discord.MessageEmbed()
                                .setColor("#304281")
                                .setTitle(`Bust!`)
                                .setAuthor(
                                  message.author.username,
                                  message.author.displayAvatarURL({
                                    format: "png",
                                    dynamic: true,
                                  })
                                )
                                .setDescription(`Your total was ${total}!`);

                              return message.channel.send(newEmbed);
                            }
                            if (total < 21) {
                              Profile.findOneAndUpdate(
                                { userID: message.author.id },
                                { tokens: amt * 1.3 + coinz },
                                (err, user) => {
                                  if (err) {
                                    return console.log(err);
                                  }
                                }
                              );
                              const newEmbed = new Discord.MessageEmbed()
                                .setColor("#304281")
                                .setTitle(`You Won!`)
                                .setAuthor(
                                  message.author.username,
                                  message.author.displayAvatarURL({
                                    format: "png",
                                    dynamic: true,
                                  })
                                )
                                .setDescription(
                                  `5 Card Charlie Rule! You got dealt 5 cards without reaching 21. \nYou Won ${(
                                    amt * 1.3 -
                                    amt
                                  ).toFixed(2)} tokens!`
                                );

                              return message.channel.send(newEmbed);
                            }
                          }
                          if (messageReceived == "stay") {
                            if (total == 21 && dealer_hand != 21) {
                              Profile.findOneAndUpdate(
                                { userID: message.author.id },
                                { tokens: amt * 1.3 + coinz },
                                (err, user) => {
                                  if (err) {
                                    return console.log(err);
                                  }
                                }
                              );
                              const newEmbed = new Discord.MessageEmbed()
                                .setColor("#304281")
                                .setTitle(`Blackjack!`)
                                .setAuthor(
                                  message.author.username,
                                  message.author.displayAvatarURL({
                                    format: "png",
                                    dynamic: true,
                                  })
                                )
                                .setDescription(
                                  `Your total was ${total}\nYou Won ${(
                                    amt * 1.3 -
                                    amt
                                  ).toFixed(2)} tokens!`
                                );

                              return message.channel.send(newEmbed);
                            }
                            if (total > 21) {
                              const newEmbed = new Discord.MessageEmbed()
                                .setColor("#304281")
                                .setTitle(`Bust!`)
                                .setAuthor(
                                  message.author.username,
                                  message.author.displayAvatarURL({
                                    format: "png",
                                    dynamic: true,
                                  })
                                )
                                .setDescription(`Your total was ${total}!`);

                              return message.channel.send(newEmbed);
                            }
                            if (total < 21 && total > dealer_hand) {
                              Profile.findOneAndUpdate(
                                { userID: message.author.id },
                                { tokens: amt * 1.3 + coinz },
                                (err, user) => {
                                  if (err) {
                                    return console.log(err);
                                  }
                                }
                              );
                              const newEmbed = new Discord.MessageEmbed()
                                .setColor("#304281")
                                .setTitle(`You Won!`)
                                .setAuthor(
                                  message.author.username,
                                  message.author.displayAvatarURL({
                                    format: "png",
                                    dynamic: true,
                                  })
                                )
                                .setDescription(
                                  `Your total was ${total}\nYou Won ${(
                                    amt * 1.3 -
                                    amt
                                  ).toFixed(2)} tokens!`
                                );

                              return message.channel.send(newEmbed);
                            }
                            if (total < 21 && total < dealer_hand) {
                              const newEmbed = new Discord.MessageEmbed()
                                .setColor("#304281")
                                .setTitle(`You Lost!`)
                                .setAuthor(
                                  message.author.username,
                                  message.author.displayAvatarURL({
                                    format: "png",
                                    dynamic: true,
                                  })
                                )
                                .setDescription(
                                  `Your total was ${total}\nDealers total was ${dealer_hand}`
                                );

                              return message.channel.send(newEmbed);
                            }
                            if (total == dealer_hand) {
                              Profile.findOneAndUpdate(
                                { userID: message.author.id },
                                { tokens: coinz },
                                (err, user) => {
                                  if (err) {
                                    return console.log(err);
                                  }
                                }
                              );
                              const newEmbed = new Discord.MessageEmbed()
                                .setColor("#304281")
                                .setTitle(`Push!`)
                                .setAuthor(
                                  message.author.username,
                                  message.author.displayAvatarURL({
                                    format: "png",
                                    dynamic: true,
                                  })
                                )
                                .setDescription(
                                  `Your total was ${total}\nDealers total was ${total}\nNo Gain, No Loss`
                                );

                              return message.channel.send(newEmbed);
                            }
                          }
                        });
                    }
                    if (String(messageReceived1).toLowerCase() == "stay") {
                      if (total > dealer_hand && total < 22) {
                        Profile.findOneAndUpdate(
                          { userID: message.author.id },
                          { tokens: amt * 1.3 + coinz },
                          (err, user) => {
                            if (err) {
                              return console.log(err);
                            }
                          }
                        );
                        const newEmbed = new Discord.MessageEmbed()
                          .setColor("#304281")
                          .setTitle(`You Won!`)
                          .setAuthor(
                            message.author.username,
                            message.author.displayAvatarURL({
                              format: "png",
                              dynamic: true,
                            })
                          )
                          .setDescription(
                            `Your total was ${total}\nYou Won ${(
                              amt * 1.3 -
                              amt
                            ).toFixed(2)} tokens!`
                          );

                        return message.channel.send(newEmbed);
                      }
                      if (total < dealer_hand && total < 22) {
                        const newEmbed = new Discord.MessageEmbed()
                          .setColor("#304281")
                          .setTitle(`You Lost!`)
                          .setAuthor(
                            message.author.username,
                            message.author.displayAvatarURL({
                              format: "png",
                              dynamic: true,
                            })
                          )
                          .setDescription(
                            `Your total was ${total}\nDealer total was ${dealer_hand}\n`
                          );

                        return message.channel.send(newEmbed);
                      } else {
                        Profile.findOneAndUpdate(
                          { userID: message.author.id },
                          { tokens: coinz },
                          (err, user) => {
                            if (err) {
                              return console.log(err);
                            }
                          }
                        );
                        const newEmbed = new Discord.MessageEmbed()
                          .setColor("#304281")
                          .setTitle(`Push!`)
                          .setAuthor(
                            message.author.username,
                            message.author.displayAvatarURL({
                              format: "png",
                              dynamic: true,
                            })
                          )
                          .setDescription(
                            `Your total was ${total}\nDealer total was ${dealer_hand}\nNo Gain, No Loss`
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
                    { tokens: amt * 1.3 + coinz },
                    (err, user) => {
                      if (err) {
                        return console.log(err);
                      }
                    }
                  );
                  const newEmbed = new Discord.MessageEmbed()
                    .setColor("#304281")
                    .setTitle(`You Won!`)
                    .setAuthor(
                      message.author.username,
                      message.author.displayAvatarURL({
                        format: "png",
                        dynamic: true,
                      })
                    )
                    .setDescription(
                      `Your total was ${total}\nYou Won ${(
                        amt * 1.3 -
                        amt
                      ).toFixed(2)} tokens!`
                    );

                  return message.channel.send(newEmbed);
                }
                if (total == dealer_hand) {
                  Profile.findOneAndUpdate(
                    { userID: message.author.id },
                    { tokens: coinz },
                    (err, user) => {
                      if (err) {
                        return console.log(err);
                      }
                    }
                  );
                  const newEmbed = new Discord.MessageEmbed()
                    .setColor("#304281")
                    .setTitle(`Push!`)
                    .setAuthor(
                      message.author.username,
                      message.author.displayAvatarURL({
                        format: "png",
                        dynamic: true,
                      })
                    )
                    .setDescription(
                      `Your total was ${total}\nDealer total was ${dealer_hand}!\nNo Gain, No Loss`
                    );

                  return message.channel.send(newEmbed);
                } else {
                  const newEmbed = new Discord.MessageEmbed()
                    .setColor("#304281")
                    .setTitle(`Better luck next time!`)
                    .setAuthor(
                      message.author.username,
                      message.author.displayAvatarURL({
                        format: "png",
                        dynamic: true,
                      })
                    )
                    .setDescription(
                      `Your total was ${total}\nDealer total was ${dealer_hand}!`
                    );

                  return message.channel.send(newEmbed);
                }
              }
            });
        }
      }
    );
  },
};
