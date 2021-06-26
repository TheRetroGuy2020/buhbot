const BaseCommand = require('../../utils/structures/BaseCommand');
const fs = require('fs');
const discord = require('discord.js');

module.exports = class BuhAllCommand extends BaseCommand {
  constructor() {
    super('buhall', 'counter', []);
  }

  async run(client, message, args) {

    const data = fs.readFileSync('C:/Users/Administrator/Desktop/BuhBot/buhbot/BuhBot/count.json', 'utf8');
    var databases = JSON.parse(data);
    const embedLead = new discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle("Complete **BUH** Count!")
    .setThumbnail('https://i.imgur.com/eM0PgxO.png')
    .setDescription("All **BUH'S** said in all active servers I am in!")
    .addFields(
        { name: "**Buhs**", value: ("**"+databases.overall+"**")}
    )
    .setFooter('Made by @JaxTheShep#3609', 'https://i.imgur.com/BdSIFXc.png');
    message.channel.send(embedLead);
  }
}