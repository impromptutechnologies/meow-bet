const Profile = require("../models/profileSchema");

module.exports = {
  name: "work",
  description: "Work Hard, Play Hard",
  execute(client, message, args, Discord, profileData) {
    min = Math.ceil(1);
    max = Math.floor(11);
    const number1 = Math.floor(Math.random() * (max - min) + min);
    const number2 = Math.floor(Math.random() * (max - min) + min);
    const right = number1 + number2;
    const newEmbed = new Discord.MessageEmbed()
      .setColor("#304281")
      .setTitle(`Work`)
      .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
      .setDescription("Solve the problem correctly in 5 seconds and win 100 token!")
      .addFields({ name: "What is..", value: `${number1} + ${number2}`})
      .setFooter("visit http://localhost:3000/tokens to earn tokens!")
      .setURL("http://localhost:3000/bet");
    message.channel.send(newEmbed);
    const filter = (m) => m.author.id === message.author.id;
    message.channel
      .awaitMessages(filter, { max: 1, time:10000})
      .then((collected) => {
        const coinz = profileData.coins;
        const messageReceived1 = collected.first().content;
        if(messageReceived1 == right){
          Profile.findOneAndUpdate(
            { userID: message.author.id },
            { coins: 100 + coinz},
            (err, user) => {
              if (err) {
                return console.log(err);
              }
            }
          );
          message.channel.send('Well Done! You earned 100 Tokens!');
        } else{
          message.channel.send('Please focus more in school');
        }
    });
}
}
