const BaseCommand = require('../../utils/structures/BaseCommand');
const fs = require('fs');
const discord = require('discord.js');

module.exports = class ServerTotalCommand extends BaseCommand {
  constructor() {
    super('servers', 'counter', []);
  }

  async run(client, message, args) {

    const data = fs.readFileSync('C:/Users/TheRetroGuy/Documents/GitHub/buhbot/BuhBot/count.json', 'utf8');
    var databases = JSON.parse(data);
    const embedLead = new discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle("Server Count!")
    .setThumbnail('https://i.imgur.com/eM0PgxO.png')
    .setDescription("Current amount of active servers I am in!")
    .addFields(
        { name: "**Servers**", value: ("**"+databases.servers.length+"**")}
    )
    .setFooter('Made by @JaxTheShep#3609', 'https://i.imgur.com/BdSIFXc.png');
    message.channel.send(embedLead);
  }
}