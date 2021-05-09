const request = require("request");
const Crypto = require("../models/cryptoSchema");
const rp = require('request-promise');

const cryptoPrice = () => {
    Crypto.find({}, (error, cryptos) => {
      cryptos.forEach((crypto) => {
          console.log(crypto.symbol)
          const CoinMarketCap = require('coinmarketcap-api')
          const apiKey = '992b34d4-f844-4fe2-85f0-3979f7a206af'
          const client = new CoinMarketCap(apiKey)
          client.getQuotes({symbol: crypto.symbol, convert: 'USD'}).then(response => {
            console.log(response.data[crypto.symbol].quote.USD.percent_change_24h);
            Crypto.findOneAndUpdate({symbol: crypto.symbol}, { return: response.data[crypto.symbol].quote.USD.percent_change_24h}, (error, crypto) => {
                  if(error){
                      console.log(error)
                  } 
            })
          });
        }) 
  });
};
/*
const cryptoPriceOpen = () => {
  Crypto.find({}, (error, cryptos) => {
    cryptos.forEach((crypto) => {
        console.log(crypto.symbol)
        const CoinMarketCap = require('coinmarketcap-api')
        const apiKey = '992b34d4-f844-4fe2-85f0-3979f7a206af'
        const client = new CoinMarketCap(apiKey)
        client.getQuotes({symbol: crypto.symbol, convert: 'USD'}).then(response => {
          console.log(response.data[crypto.symbol].quote.USD.percent_change_24h);
          Crypto.findOneAndUpdate({symbol: crypto.symbol}, { return: response.data[crypto.symbol].quote.USD.percent_change_24h}, (error, crypto) => {
                if(error){
                    console.log(error)
                } 
          })
        });
      }) 
});
};
*/
module.exports = cryptoPrice;
