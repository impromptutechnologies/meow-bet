const Casino = require("../models/casinoSchema");

module.exports = {
  name: "newcasinocommand",
  cooldown: 1,
  description: "Create Outcome!",
  execute(client, message, args, Discord, profileData) {
    try {
      let command = Casino.create(
        {
          command: "BLJK",
          description: "Play Blackjack. 1.5x If you Win",
        },
        (err, res) => {
          if (err) {
            return console.log(err);
          }
          res.save();
        }
      );
    } catch (err) {
      console.log(err);
    }
    message.channel.send("outcome created");
  },
};
