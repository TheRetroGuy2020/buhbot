const BaseCommand = require('../../utils/structures/BaseCommand');
const fs = require('fs');
const discord = require('discord.js');

function userMention(message){
  if(!message.mentions){
    return undefined;
  }
  return message.mentions.users.findKey(user => user.id);
}

function userMentionUserAva(message){
  return message.mentions.members.first();
}


module.exports = class BuhUserCommand extends BaseCommand {
  constructor() {
    super('buhuser', 'counter', []);
  }

  async run(client, message, args) {

    const data = fs.readFileSync('C:/Users/TheRetroGuy/Documents/GitHub/buhbot/BuhBot/count.json', 'utf8');
    var databases = JSON.parse(data);
    var Uname = message.member.id;
    var tf = false;
    if(userMention(message)){
      Uname = userMention(message);
      for(var i = 0; databases.users.length > i; i++){
        if(databases.users[i].nameID == Uname){
            const embedLead = new discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle(userMentionUserAva(message).user.username)
            .setDescription("Mentioned Users **BUH** amount!")
            .setThumbnail(userMentionUserAva(message).user.displayAvatarURL())
            .addFields(
                { name: "**Buhs**", value: ("**"+databases.users[i].buhcount+"**")},
                { name: "**Ranking**", value: ("**"+databases.users[i].buhrank+"**")}
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
        .setDescription("Mentioned user hasn't said any **BUHS**!")
        .setThumbnail(userMentionUserAva(message).user.displayAvatarURL())
        .setFooter('Made by @JaxTheShep#3609', 'https://i.imgur.com/BdSIFXc.png');
        message.channel.send(embedLead);
    }
    }
    if(!userMention(message)){
      for(var i = 0; databases.users.length > i; i++){
          if(databases.users[i].nameID == Uname){
              const embedLead = new discord.MessageEmbed()
              .setColor('#ff0000')
              .setTitle(message.member.user.username)
              .setDescription("Your **BUH** amount!")
              .setThumbnail(message.member.user.avatarURL())
              .addFields(
                  { name: "**Buhs**", value: ("**"+databases.users[i].buhcount+"**")},
                  { name: "**Ranking**", value: ("**"+databases.users[i].buhrank+"**")}
              )
              .setFooter('Made by @JaxTheShep#3609', 'https://i.imgur.com/BdSIFXc.png');
              message.channel.send(embedLead);
              tf = true;
          }
        }
        if(tf == false){
          const embedLead = new discord.MessageEmbed()
          .setColor('#ff0000')
          .setTitle(message.member.user.username)
          .setDescription("You haven't said any **BUHS**!")
          .setThumbnail(message.member.user.avatarURL())
          .setFooter('Made by @JaxTheShep#3609', 'https://i.imgur.com/BdSIFXc.png');
          message.channel.send(embedLead);
      }
    }
  }
}