const Stock = require("../../models/stockSchema");
const Invest = require("../../models/investSchema");
const moment = require("moment-timezone");
const stockPrice = require("../../utils/stockprice");

module.exports = () => {
    console.log('bot online')
    const checkForPosts = async () => {
        var day = moment.utc().format("DD");
        var month = moment.utc().format("MM");
        var date = moment.utc().format("MM-DD HH:mm");
        var date1 = moment.utc().format(`${month}-${day} 13:30`);
        var date2 = moment.utc().format(`${month}-${day} 20:00`);
        const investments = await Invest.find({});
        console.log(investments.length);
        if (
          date == moment.utc().format(`${month}-${day} 03:25`) &&
          investments.length !== 0
        ) {
          Stock.find({}, (error, highest) => {
            if(error){
              console.log(error)
            }
            if(highest[0].return==0){
              stockPrice((error, highest) => {
                if (error) {
                  return console.log(error);
                }
              });
            }
          }).limit(1);
        }
        setTimeout(checkForPosts, 1000 * 10);
      };
      checkForPosts();
}
    
      
