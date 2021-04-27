const Outcome = require("../models/outcomeSchema");

module.exports = {
  name: "newoutcome",
  cooldown: 10,
  description: "Create Outcome!",
  execute(client, message, args, Discord, profileData) {
    try {
      let outcome = Outcome.create(
        {
          outcomeID: message.author.id,
          category: "basketball",
          team1: "Lakers",
          team2: "Golden State",
          timeStart: "today",
          timeEnd: "tommorow",
        },
        (err, res) => {
          if (err) {
            return console.log(err);
          }
          res.save();
          res.addOptions(["LAKGOL1", 1.3, "LAKGOL2", 2.1]);
        }
      );
    } catch (err) {
      console.log(err);
    }
    message.channel.send("outcome created");
  },
};
