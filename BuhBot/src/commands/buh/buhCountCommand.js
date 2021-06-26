const BaseCommand = require('../../utils/structures/BaseCommand');
const fs = require('fs');
const discord = require('discord.js');

module.exports = class BuhCountCommand extends BaseCommand {
  constructor() {
    super('buhcount', 'counter', []);
  }

  async run(client, message, args) {

    const data = fs.readFileSync('C:/Users/Administrator/Desktop/BuhBot/buhbot/BuhBot/count.json', 'utf8');
    var databases = JSON.parse(data);
    var name = message.guild.name;
    var tf = false;
    for(var i = 0; databases.servers.length > i; i++){
      if(databases.servers[i].name == name){
        const embedLead = new discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle(name)
            .setDescription("Server's total **BUH** amount!")
            .setThumbnail(message.guild.iconURL())
            .addFields(
                { name: "**Buhs**", value: ("**"+databases.servers[i].buhcount+"**")}
            )
            .setFooter('Made by @JaxTheShep#3609', 'https://i.imgur.com/BdSIFXc.png');
        message.channel.send(embedLead);
        tf = true;
      }
    }
    if(tf == false){
      const embedLead = new discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle(name)
        .setDescription("No one has **BUH'D** in this server!")
        .setThumbnail(message.guild.iconURL())
        .setFooter('Made by @JaxTheShep#3609', 'https://i.imgur.com/BdSIFXc.png');
      message.channel.send(embedLead);
    }
  }
}