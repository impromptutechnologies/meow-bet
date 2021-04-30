const stockPrice = require('../utils/stockprice')
const Stock = require("../models/stockSchema");
const Invest = require("../models/investSchema");

module.exports = {
    name: "testing",
    description: "testing testing 123",
    execute(client, message, args, Discord, profileData) {
        stockPrice((error, highest) => {
            if (error) {
              return console.log(error);
            }
            

    });
    Stock.find({}, (error, highest) => {
        console.log(highest[0].ticker)
    }).sort({return:-1}).limit(1);
}
}
