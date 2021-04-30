const Outcome = require("../models/outcomeSchema");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require('uuid');

module.exports = {
  name: "newoutcome",
  cooldown: 10,
  description: "Create Outcome!",
  execute(client, message, args, Discord, profileData) {
    try {
      var day = moment.utc().format("DD");
      var month = moment.utc().format("MM");
      var date = moment.utc().format("MM-DD HH:mm");
      var date2 = moment.utc().format(`${month}-${day} 20:45`);
      var date1 = moment.utc().format(`${month}-${day} 19:00`);
      let outcome = Outcome.create(
        {
          outcomeID: uuidv4(),
          category: "soccer",
          team1: "Leicester",
          team2: "Southhampton",
          timeStart: date1,
          timeEnd: date2,
        },
        (err, res) => {
          if (err) {
            return console.log(err);
          }
          res.save();
          res.addOptions(["LEISOU1", 1.3, "LEISOU2",1.5, "LEISOU3", 2.1]);
        }
      );
    } catch (err) {
      console.log(err);
    }
    message.channel.send("outcome created");
  },
};
