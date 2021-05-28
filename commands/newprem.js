const Prem = require("../models/premSchema");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require('uuid');

module.exports = {
  name: "prem",
  cooldown: 10,
  description: "Create Random Outcome!",
  execute(client, message, args, Discord, profileData) {
    try {
      let command = Prem.create(
        {
          command: "PRETTY",
          description: "A pretty girl",
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

//Prettyk
//Prettyk

//Money
//Dark Humor (OFFENSIVE)
//Cat Images
//Fun Fact
//Lofi Track
//Cute videos

