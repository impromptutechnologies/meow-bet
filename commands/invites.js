const Profile = require("../models/profileSchema");

module.exports = {
  name: "invites",
  description: "invites commands",
  execute(client, message, args, Discord, profileData) {
    if (message.guild.id == "869141664529272842") {
      const user = message.author;
      const invited = async () => {
        const invites = await message.guild.fetchInvites();
        console.log(invites, user)
        let userInv = invites.filter(
          (u) => u.inviter && u.inviter.id === user.id
        );
        if (userInv.size <= 0) {
          return message.channel.send(
            `${user.username} don't have any invites`
          );
        }
        let invCodes = userInv.map((x) => x.code).join(",");
        let i = 0;
        userInv.forEach((inv) => (i += inv.uses));
        if (i > profileData.invites) {
          /*const prof = await Profile.findOneAndUpdate(
            { userID: profileData.userID },
            { invites: i }
          );*/
          console.log(i, profileData.invites)
          if (10 > i && i >= 3 && 3 >= profileData.invites) {
            console.log('hey1')
            const prof = await Profile.findOneAndUpdate(
              { userID: profileData.userID },
              { $inc: { tokens: 150 }, invites: i }
            );
            const newEmbed = new Discord.MessageEmbed()
              .setColor("#304281")
              .setTitle(`You reached ${i} invites!`)
              .setAuthor(
                message.author.username,
                message.author.displayAvatarURL({
                  format: "png",
                  dynamic: true,
                })
              )
              .setDescription(
                `You have won 150 tokens. Reach 10 invites for your next reward!`
              )
              .setFooter("visit https://getmeow.gg/tokens to get tokens!")
              .setURL("https://getmeow.gg/tokens");
            message.channel.send(newEmbed);
          }
          if (20 > i && i >= 10 && 10 >= profileData.invites) {
            console.log('hey2')
            const prof = await Profile.findOneAndUpdate(
              { userID: profileData.userID },
              { $inc: { tokens: 200 }, invites: i }
            );
            const newEmbed = new Discord.MessageEmbed()
              .setColor("#304281")
              .setTitle(`You reached ${i} invites!`)
              .setAuthor(
                message.author.username,
                message.author.displayAvatarURL({
                  format: "png",
                  dynamic: true,
                })
              )
              .setDescription(
                `You have won 200 tokens. Reach 20 invites for your next reward!`
              )
              .setFooter("visit https://getmeow.gg/tokens to get tokens!")
              .setURL("https://getmeow.gg/tokens");
            message.channel.send(newEmbed);
          }
          if (35 > i && i >= 20 && 20 >= profileData.invites) {
            console.log('hey3')
            const prof = await Profile.findOneAndUpdate(
              { userID: profileData.userID },
              { $inc: { tokens: 500 }, invites: i }
            );
            const newEmbed = new Discord.MessageEmbed()
              .setColor("#304281")
              .setTitle(`You reached ${i} invites!`)
              .setAuthor(
                message.author.username,
                message.author.displayAvatarURL({
                  format: "png",
                  dynamic: true,
                })
              )
              .setDescription(
                `You have won 500 tokens. Reach 35 invites for your next reward!`
              )
              .setFooter("visit https://getmeow.gg/tokens to get tokens!")
              .setURL("https://getmeow.gg/tokens");
            message.channel.send(newEmbed);
          }
          if (60 > i && i >= 35 && 35 >= profileData.invites) {
            console.log('hey4')
            const prof = await Profile.findOneAndUpdate(
              { userID: profileData.userID },
              { $inc: { tokens: 1000 }, invites: i }
            );
            const newEmbed = new Discord.MessageEmbed()
              .setColor("#304281")
              .setTitle(`You reached ${i} invites!`)
              .setAuthor(
                message.author.username,
                message.author.displayAvatarURL({
                  format: "png",
                  dynamic: true,
                })
              )
              .setDescription(
                `You have won 1000 tokens. Reach 60 invites for your next reward!`
              )
              .setFooter("visit https://getmeow.gg/tokens to get tokens!")
              .setURL("https://getmeow.gg/tokens");
            message.channel.send(newEmbed);
          }
          if (i >= 60) {
            console.log('hey5')
            const prof = await Profile.findOneAndUpdate(
              { userID: profileData.userID },
              { $inc: { tokens: 1800 }, invites: "10000001" }
            );
            1;
            const newEmbed = new Discord.MessageEmbed()
              .setColor("#304281")
              .setTitle(`You reached ${i} invites!`)
              .setAuthor(
                message.author.username,
                message.author.displayAvatarURL({
                  format: "png",
                  dynamic: true,
                })
              )
              .setDescription(`You have won 1800 tokens. Thanks for your help!`)
              .setFooter("visit https://getmeow.gg/tokens to get tokens!")
              .setURL("https://getmeow.gg/tokens");
            message.channel.send(newEmbed);
          }
          else{
            console.log('hey6')
          const newEmbed = new Discord.MessageEmbed()
            .setColor("#304281")
            .setTitle(`You currently have ${i} invites.`)
            .setAuthor(
              message.author.username,
              message.author.displayAvatarURL({
                format: "png",
                dynamic: true,
              })
            )
            .setDescription(
              `3 invites: 150 Tokens, 10 invites: 200 Tokens, 20 invites: 500 Tokens, 35 invites: 1000 Tokens, 60 invites: 1800 Tokens. `
            )
            .setFooter("visit https://getmeow.gg/tokens to get tokens!")
            .setURL("https://getmeow.gg/tokens");
          message.channel.send(newEmbed);
          }
        } else {
          console.log('hey6')
          const newEmbed = new Discord.MessageEmbed()
            .setColor("#304281")
            .setTitle(`You currently have ${i} invites.`)
            .setAuthor(
              message.author.username,
              message.author.displayAvatarURL({
                format: "png",
                dynamic: true,
              })
            )
            .setDescription(
              `3 invites: 150 Tokens, 10 invites: 200 Tokens, 20 invites: 500 Tokens, 35 invites: 1000 Tokens, 60 invites: 1800 Tokens. `
            )
            .setFooter("visit https://getmeow.gg/tokens to get tokens!")
            .setURL("https://getmeow.gg/tokens");
          message.channel.send(newEmbed);
        }
      };
      invited();
    }
  },
};

