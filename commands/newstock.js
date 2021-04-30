const Stock = require("../models/stockSchema");
const { v4: uuidv4 } = require('uuid');



module.exports = {
  name: "newstock",
  cooldown: 10,
  description: "Create Investment!",
  execute(client, message, args, Discord, profileData) {
    const company = args[0];
    const ticker = args[1];
    const finalChange = args[2];
    try {
      let stock = Stock.create(
        {
          company:company,
          ticker: ticker,
          return: finalChange,
          Odds: 3,
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
















































/*const Investment = require("../models/investmentSchema");
const { v4: uuidv4 } = require('uuid');



module.exports = {
  name: "newinvestment",
  cooldown: 10,
  description: "Create Investment!",
  execute(client, message, args, Discord, profileData) {
    const option1 = args[0];
    const option2 = args[1];
    const code1 = args[2];
    const code2 = args[3];
    try {
      let investment = Investment.create(
        {
          investmentID: uuidv4(),
          category: "crypto",
          option1: option1,
          option2: option2,
          code1: code1,
          code2: code2,
          totalInvested1: 0,
          totalInvested2: 0,
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
};*/
