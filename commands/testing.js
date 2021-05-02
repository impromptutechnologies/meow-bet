const stockPrice = require("../utils/stockprice");
const Stock = require("../models/stockSchema");
const Invest = require("../models/investSchema");
const moment = require("moment-timezone");

module.exports = {
    name: "testing",
    description: "testing testing 123",
    execute(client, message, args, Discord, profileData) {
        Stock.find({}, (error, highest) => {
            var day = moment.utc().format("DD");
            var month = moment.utc().format("MM");
            const date = moment.utc().format(`${month}-${day} 01:37`, "MM-DD HH:mm")
            console.log(date)
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
