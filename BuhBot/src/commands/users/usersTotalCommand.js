const BaseCommand = require('../../utils/structures/BaseCommand');
const fs = require('fs');
const discord = require('discord.js');

module.exports = class UserTotalCommand extends BaseCommand {
  constructor() {
    super('users', 'counter', []);
  }

  async run(client, message, args) {

    const data = fs.readFileSync('C:/Users/Administrator/Desktop/buhbot/BuhBot/count.json', 'utf8');
    var databases = JSON.parse(data);
    const embedLead = new discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle("User Count!")
    .setThumbnail('https://i.imgur.com/eM0PgxO.png')
    .setDescription("Current amount of users who have **BUH'D**")
    .addFields(
        { name: "**Users**", value: ("**"+databases.users.length+"**")}
    )
    .setFooter('Made by @JaxTheShep#3609', 'https://i.imgur.com/BdSIFXc.png');
    message.channel.send(embedLead);

  }
}