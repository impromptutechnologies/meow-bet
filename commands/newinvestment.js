const Investment = require("../models/investmentSchema");

module.exports = {
  name: "newinvestment",
  cooldown: 10,
  description: "Create Investment!",
  execute(client, message, args, Discord, profileData) {
    try {
      let investment = Investment.create(
        {
          investmentID: message.author.id,
          category: "stocks",
          option1: "AAPL",
          option2: "AMZN",
          timeStart: "today",
          timeEnd: "tommorow",
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
