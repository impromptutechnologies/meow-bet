const stockPrice = require("../utils/stockprice");
const newMatchesSoccer = require("../utils/newmatches");
const newMatchesBasketball = require("../utils/newmatchesb");
const newMatchesEsports = require("../utils/newmatchese");
const betResult = require("../utils/betresult");
var request = require("request");

const Stock = require("../models/stockSchema");
const Crypto = require("../models/cryptoSchema");
const Invest = require("../models/investSchema");
const Outcome = require("../models/outcomeSchema");
const moment = require("moment-timezone");
const cryptoPriceOpen = require("../utils/cryptopriceopen");
const betResultEsports = require("../utils/betresultesports");

module.exports = {
    name: "testing",
    description: "testing testing 123",
    execute(client, message, args, Discord, profileData) {
        newMatchesBasketball();
        newMatchesSoccer();
        //setOdds();
        //newMatchesBasketball();
        //newMatchesEsports();

        //cryptoPriceOpen();

    }

}
