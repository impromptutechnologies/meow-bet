const request = require("request");
const Stock = require("../models/stockSchema");


const stockPrice = (callback) => {

    Stock.find({}, (error, stocks) => {
        stocks.forEach((stock) => {
            const url = `http://api.marketstack.com/v1/eod?access_key=b43c8007a25da9601cd55d83b6d3a6ad&symbols=${stock.ticker}&limit=1`;
            console.log(stock)
            request ({ url, json: true },(error, { body }) => {
                if (error) {
                  callback("Unable to connect", undefined);
                } else if (body.length === 0) {
                  callback("No Stocks", undefined);
                } else {
                  closingChange = (((body.data[0].close)-(body.data[0].open))/(body.data[0].open))*100;
                  Stock.findOneAndUpdate({ticker: stock.ticker}, { return: closingChange}, (error, stock) => {
                        if(error){
                            console.log(error)
                        }
                  })
                }
              }); 
          }) 

    });
    Stock.find({}, (error, highest) => {
        callback(highest)
    }).sort({return:-1}).limit(1);
    
      

};

module.exports = stockPrice;
