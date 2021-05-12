const Invest = require("../models/investSchema");
const moment = require("moment-timezone");
const Profile = require("../models/profileSchema");
const stockPrice = require("../utils/stockprice");
const Stock = require("../models/stockSchema");

module.exports = {
  name: "invstock",
  cooldown: 1,
  description: "Invest stock!",
  execute(client, message, args, Discord, profileData) {
    const checkForPosts = async () => {
      var day = moment.utc().format("DD");
      var month = moment.utc().format("MM");
      var date = moment.utc().format("MM-DD HH:mm");
      var date1 = moment.utc().format(`${month}-${day} 13:30`);
      var date2 = moment.utc().format(`${month}-${day} 20:00`);
      const investments = await Invest.find({ creatorID: message.author.id, category:"stocks"});
      console.log(`myinvests - ${message.author.tag} -`, investments.length)
      /*if (
        date == moment.utc().format(`${month}-${day} 00:11`) &&
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
      

       For Bets:
        Set a forloop for each outcome, and then just check if the end date matches the current date. 
        For sports its predictable, but for esports maybe we need to say its done. Once again depends.
        
        This should ideally be done inside the actual investstock and investcrypto files


        
      
      */
      if (
        date == moment.utc().format(`${month}-${day} 20:32`) &&
        investments.length !== 0
      ) {
        Stock.find({}, (error, highest) => {
          if (error) {
            return console.log(error);
          }
          console.log(highest)

          Invest.find({ Code: highest[0].ticker }, (err, successes) => {
            for (const success of successes) {
              const creatorID = success.creatorID;
              console.log(successes)

              Profile.findOne({ userID: creatorID }, (err, profile) => {
                const coinz = profile.coins;
                const investAmount = success.investAmount;
                const channelID = success.channelID;
                if (profile) {
                  Stock.findOne({ ticker: success.Code }, (err, inv) => {
                    const yourWinnings = 3 * investAmount
                    Profile.findOneAndUpdate(
                      { userID: creatorID },
                      { coins: yourWinnings + coinz },
                      (err, user) => {
                        if (err) {
                          return console.log(err);
                        }
                        const embedUser = client.users.fetch(user.userID);
                        embedUser.then(function (result1) {
                          const newEmbed = new Discord.MessageEmbed()
                            .setColor("#304281")
                            .setTitle(`Good Investment!`)
                            .setAuthor(
                              result1.username,
                              result1.displayAvatarURL({
                                format: "png",
                                dynamic: true,
                              })
                            )
                            .addFields(
                              {
                                name: "Invest Amount",
                                value: investAmount,
                              },
                              {
                                name: "Winnings",
                                value: yourWinnings.toFixed(2),
                              },
                              {
                                name: "Profit",
                                value: (yourWinnings - investAmount).toFixed(2),
                              }
                            )
                            .setFooter(
                              "visit http://localhost:3000/betsst to view bets!"
                            )
                            .setURL("http://localhost:3000/betsst");
                          client.channels.cache.get(channelID).send(newEmbed);
                          Invest.deleteMany({creatorID: creatorID, category:"stocks"}, (error, deleted) => {
                            if(error){
                              console.log(error)
                            }
                            console.log('deleted with winnings')
                          });
                        });
                        
                        
                      }
                    );
                  });
                } 
                Invest.deleteMany({creatorID: message.author.id, category:"stocks"}, (error, deleted) => {
                  if(error){
                    console.log(error)
                  }
                  console.log('deleted')
                });
                
              });
              

            }
          });
          
          Invest.deleteMany({creatorID: message.author.id, category:"stocks"}, (error, deleted) => {
            if(error){
              console.log(error)
            }
            console.log('deleted')
          });
          
          
        }).sort({return:-1}).limit(1);


        
      }
      setTimeout(checkForPosts, 1000 * 10);
    };
    
    const code = args[1];
    const amt = parseInt(args[0]);
    if(isNaN(amt)){
      return message.channel.send(
        `That's not a number`
      );
    }
    var day = moment.utc().format("DD");
    var month = moment.utc().format("MM");
    var date = moment.utc().format("MM-DD HH:mm");
    var date1 = moment.utc().format(`${month}-${day} 13:30`);
    var date2 = moment.utc().format(`${month}-${day} 20:35`);
    var stillUtc = moment.utc(date1).toDate();
    var stillUtc2 = moment.utc(date2).toDate();
    var local = moment(stillUtc).local().format("hh:mm A");
    var local2 = moment(stillUtc2).local().format("hh:mm A");
    if (date > date1 && date < date2) {
      const newEmbed = new Discord.MessageEmbed()
        .setColor("#304281")
        .setTitle(`Market Already Open!`)
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ format: "png", dynamic: true })
        )
        .setDescription(
          `Please place your investment commands between ${local2} and ${local} in your local time.
          The US stock market opens from 9:30am to 4pm ET so place your commands before the market opens.`
        )
        .setFooter(
          "visit http://localhost:3000/betsst to view more investments!"
        )
        .setURL("http://localhost:3000/betsst");
      return message.channel.send(newEmbed);
    }
    if (!code) {
      return message.channel.send(`No Code Provided`);
    }
    if (amt > profileData.coins) {
      return message.channel.send(`Not Enough tokens...`);
    }
    try {
      Invest.findOne(
        { creatorID: message.author.id, Code: code },
        (err, invest) => {
          if (err) {
            return console.log(err);
          } if (invest) {
            return message.channel.send("Investment Exists");
          }
          Stock.findOne(
            {
              ticker: code
            },
            (err, stockData) => {
              if (err) {
                return message.channel.send("Wrong Code")
              }
              if (stockData) {
                  if (message.guild === null) {
                    return message.author.send(
                      "This particular command must be placed in a server"
                    );
                  }
                  profileData.coins = profileData.coins - amt;
                  profileData.save();
                  Invest.create(
                    {
                      creatorID: message.author.id,
                      serverID: message.guild.id,
                      channelID: message.channel.id,
                      category: "stocks",
                      creatorName: message.author.username,
                      investAmount: amt,
                      Code: code,
                    },
                    (err, res) => {
                      if (err) {
                        return console.log(err);
                      }
                      res.save();
                      const newEmbed = new Discord.MessageEmbed()
                        .setColor("#304281")
                        .setTitle(`Investment Ticket`)
                        .setAuthor(
                          message.author.username,
                          message.author.displayAvatarURL({
                            format: "png",
                            dynamic: true,
                          })
                        )
                        .setDescription("Good Luck :)")
                        .addFields(
                          { name: "Invested Amount", value: amt },
                          { name: "Stock", value: code }
                        )
                        .setFooter(
                          "visit http://localhost:3000/betsst to view more stocks!"
                        )
                        .setURL("http://localhost:3000/betsst");
                      message.channel.send(newEmbed);
                      checkForPosts();
                    }
                  );
              }
            }
          );
        }
      );
    } catch (err) {
      console.log(err, "hey");
    }
  },
};
