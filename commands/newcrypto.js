const Crypto = require("../models/cryptoSchema");
const { v4: uuidv4 } = require('uuid');



module.exports = {
  name: "newcrypto",
  cooldown: 10,
  description: "Create Investment(crypto)!",
  execute(client, message, args, Discord, profileData) {
    const crypto1 = args[0];
    const symbol = args[1];
    try {
      let crypto = Crypto.create(
        {
          Crypto: crypto1,
          symbol: symbol,
          return:0,
          openPrice:0,
          closePrice:0,
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
    message.channel.send("crypto invest created");
  },
};
