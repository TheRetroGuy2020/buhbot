const BaseCommand = require('../../utils/structures/BaseCommand');
const fs = require('fs');
const discord = require('discord.js');

function sortByValue(jsObj){
  return jsObj.sort(function(a,b){
    return b.buhcount - a.buhcount;
    }
);
}

function userMention(message){
  if(!message.mentions){
    return undefined;
  }
  return message.mentions.users.findKey(user => user.id);
}

function userMentionUserAva(message){
  return message.mentions.members.first();
}

module.exports = class LeaderUserCommand extends BaseCommand {
  constructor() {
    super('lbUser', 'leaderboard', []);
  }

  async run(client, message, args) {

    const data = fs.readFileSync('C:/Users/Administrator/Desktop/BuhBot/buhbot/BuhBot/count.json', 'utf8');
    var databases = JSON.parse(data);
    var leaderboard = sortByValue(databases.users);
    var tf = false;
    var Uname = undefined;
    if(userMention(message)){
      Uname = userMention(message);
      for(var i = 0; leaderboard.length > i; i++){
        if(leaderboard[i].nameID == Uname){
          const embedLead = new discord.MessageEmbed()
          .setColor('#ff0000')
          .setTitle(userMentionUserAva(message).user.username)
          .setThumbnail(userMentionUserAva(message).user.displayAvatarURL())
          .setDescription("Mentioned Users Position on the Leaderboard!")
          .addFields(
            { name: "**Ranking**", value: ("**"+ (i+1) +"**")}
          )
          .setFooter('Made by @JaxTheShep#3609', 'https://i.imgur.com/BdSIFXc.png');
          message.channel.send(embedLead);
          tf = true;
        }
      }
      if(tf == false){
        const embedLead = new discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle(userMentionUserAva(message).user.username)
        .setThumbnail(userMentionUserAva(message).user.displayAvatarURL())
        .setDescription("Mentioned User Doesn't Have a Place On the Leaderboard!")
        .setFooter('Made by @JaxTheShep#3609', 'https://i.imgur.com/BdSIFXc.png');
        message.channel.send(embedLead);
      }
    }
    if(!userMention(message)){
      var leaderboardString = ("1: " + leaderboard[0].name + ": " + leaderboard[0].buhcount + "\n" + "2: " + leaderboard[1].name + ": " + leaderboard[1].buhcount + "\n" + "3: " + leaderboard[2].name + ": " + leaderboard[2].buhcount + "\n" + "4: " + leaderboard[3].name + ": " + leaderboard[3].buhcount + "\n" + "5: " + leaderboard[4].name + ": " + leaderboard[4].buhcount + "\n");
      const embedLead = new discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Leaderboard of Users!')
      .setThumbnail('https://i.imgur.com/eM0PgxO.png')
      .setDescription(leaderboardString)
      .setFooter('Made by @JaxTheShep#3609', 'https://i.imgur.com/BdSIFXc.png');
      message.channel.send(embedLead);
    }
  }
}