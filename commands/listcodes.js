module.exports = {
  name: "listcodes",
  description: "List currently available betcodes!",
  execute(client, message, args) {
    const availableCodes = ["LIVTOT"];
    if (!availableCodes.length) {
      return message.channel.send(`No Bets Today :( Sorry...`);
    }
    message.channel.send(
      `For a list of all available Betcodes, please visit:\n http://127.0.0.1:64909/bet.html`
    );
  },
};
