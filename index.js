const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
require("dotenv").config();
const mongoose = require("mongoose");

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["command_handler", "event_handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client, Discord);
});

mongoose
  .connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

client.login(process.env.DISCORD_TOKEN);

/*const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.once('ready', () => {
    console.log('helo');
});

/*client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'welcome'){
        client.commands.get('welcome').execute(message, args)
    }
    if (command === 'help'){
        client.commands.get('help').execute(message, args)
    }
    if (command === 'bet'){
        client.commands.get('bet').execute(message, args)
    }
    if (command === 'listcodes'){
        client.commands.get('listcodes').execute(message, args)
    }
    if (command === 'ballers'){
        client.commands.get('ballers').execute(message, args)
    }
    if (command === 'bankroll'){
        client.commands.get('bankroll').execute(message, args)
    }
    
});*/
