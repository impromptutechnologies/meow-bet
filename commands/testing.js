const stockPrice = require('../utils/stockprice')
const Stock = require("../models/stockSchema");
const Invest = require("../models/investSchema");

module.exports = {
    name: "testing",
    description: "testing testing 123",
    execute(client, message, args, Discord, profileData) {
        Stock.find({}, (error, highest) => {
            if(highest[0].return==0){
                stockPrice((error, highprice) => {
                    if (error) {
                      return console.log(error);
                    }
                });
            }
            
        }).sort({return:-1}).limit(1);
}
}
