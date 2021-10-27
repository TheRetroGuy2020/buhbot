const BaseCommand = require('../../utils/structures/BaseCommand');
const fs = require('fs');
const discord = require('discord.js');

function channelMention(message){
  if(!message.mentions){
    return undefined;
  }
  console.log(message.mentions.channels.firstKey());
  return message.mentions.channels.firstKey();
}

function Embedsendinvalid(message){
  const embedLead = new discord.MessageEmbed()
  .setColor('#ff0000')
  .setTitle(message.member.user.username)
  .setDescription("You have not provided a channel!")
  .setThumbnail(message.member.user.avatarURL())
  .setFooter('Made by @JaxTheShep#3609', 'https://i.imgur.com/BdSIFXc.png');
  message.channel.send(embedLead);
}
function Embedsendnotadmin(message){
  const embedLead = new discord.MessageEmbed()
  .setColor('#ff0000')
  .setTitle(message.member.user.username)
  .setDescription("You are not an admin!")
  .setThumbnail(message.member.user.avatarURL())
  .setFooter('Made by @JaxTheShep#3609', 'https://i.imgur.com/BdSIFXc.png');
  message.channel.send(embedLead);
}


module.exports = class BuhUserCommand extends BaseCommand {
  constructor() {
    super('modchannel', 'mod', []);
  }

  async run(client, message, args) {

    const data = fs.readFileSync('C:/Users/Administrator/Desktop/BuhBot/buhbot/BuhBot/servermod.json', 'utf8');
    var databases = JSON.parse(data);
    var Sname = message.guild.name;
    var tf = false;
    if(!channelMention(message)){
      Embedsendinvalid(message);
      return;
    }
    if(message.member.hasPermission("ADMINISTRATOR") == true){
      for(var i = 0; databases.servers.length > i; i++){
        if(databases.servers[i].name == Sname){
          databases.servers[i].serversmod == channelMention(message);
          tf = true;
        }
      }
      if(tf == false){
        databases.servers.push({"name": message.guild.name,"serversmod":channelMention(message)});
      }
      fs.writeFile('C:/Users/Administrator/Desktop/BuhBot/buhbot/BuhBot/servermod.json', JSON.stringify(databases), 'utf8', (err) => {

        if (err) {
            console.log(`Error writing file: ${err}`);
        } else {
            console.log(`File is written successfully!`);
        }
    
    });
    }
    else{
      Embedsendnotadmin(message);
    }
  }
}