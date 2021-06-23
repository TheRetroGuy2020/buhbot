const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require('discord.js');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('helpbuh', 'helper', []);
  }

  async run(client, message, args) {
    const embedLead = new discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle('Help Page!')
    .setDescription("Welcome to learning how to **BUH**")
    .setThumbnail('https://i.imgur.com/eM0PgxO.png')
    .addFields(
      { name: "**-buhcount**", value: "Server Specific Count of BUH's", inline: true },
      { name: "**-buhall**", value: "All the buhs in all servers!", inline: true },
      { name: "**-buhuser** || **-buhuser @User**", value: "Gives the current users buh count!", inline: true },
      { name: "\u200b", value: "\u200b"},
      { name: "**-servers**", value: "Give the current server count the bot is in!", inline: true },
      { name: "**-users**", value: "Give the current amount of users that have said BUH!", inline: true },
      { name: "\u200b", value: "\u200b"},
      { name: "**-lbServer**", value: "Gives the leaderboard based on server totals!", inline: true },
      { name: "**-lbUser**", value: "Gives the leaderboard based on user totals!", inline: true }
    )
    .setFooter('Made by @JaxTheShep#3609', 'https://i.imgur.com/BdSIFXc.png');
    message.channel.send(embedLead);
  }
}