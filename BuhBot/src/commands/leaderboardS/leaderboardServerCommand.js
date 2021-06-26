const BaseCommand = require('../../utils/structures/BaseCommand');
const fs = require('fs');
const discord = require('discord.js');

function sortByValue(jsObj){
  return jsObj.sort(function(a,b){
    return b.buhcount - a.buhcount;
    }
);
}

module.exports = class LeaderServerCommand extends BaseCommand {
  constructor() {
    super('lbServer', 'leaderboard', []);
  }

  async run(client, message, args) {

    const data = fs.readFileSync('C:/Users/Administrator/Desktop/BuhBot/buhbot/BuhBot/count.json', 'utf8');
    var databases = JSON.parse(data);
    var leaderboard = sortByValue(databases.servers);
    var leaderboardString = ("1: " + leaderboard[0].name + ": " + leaderboard[0].buhcount + "\n" + "2: " + leaderboard[1].name + ": " + leaderboard[1].buhcount + "\n"+ "3: " + leaderboard[2].name + ": " + leaderboard[2].buhcount + "\n");
    const embedLead = new discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle('Leaderboard of Servers!')
    .setThumbnail('https://i.imgur.com/eM0PgxO.png')
    .setDescription(leaderboardString)
    .setFooter('Made by @JaxTheShep#3609', 'https://i.imgur.com/BdSIFXc.png');
    message.channel.send(embedLead);
  }
}