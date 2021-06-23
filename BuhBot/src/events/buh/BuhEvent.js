const BaseEvent = require('../../utils/structures/BaseEvent');
const fs = require('fs');
const discord = require('discord.js');

function Embedsend(databases, message){
  const embedLead = new discord.MessageEmbed()
  .setColor('#ff0000')
  .setTitle(message.member.user.username)
  .setDescription("You have ranked up in BUH!")
  .setThumbnail(message.member.user.avatarURL())
  .addFields(
      { name: "**New Ranking**", value: ("**"+databases+"**")}
  )
  .setFooter('Made by @JaxTheShep#3609', 'https://i.imgur.com/BdSIFXc.png');
  message.channel.send(embedLead);
}


module.exports = class BuhEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) return;
    if(message.content.startsWith(client.prefix)) return;
    var lower = message.content.toLowerCase();
    if (lower.includes('buh') == true) {
        const data = fs.readFileSync('C:/Users/TheRetroGuy/Documents/GitHub/buhbot/BuhBot/count.json', 'utf8');
        var databases = JSON.parse(data);
        var Sname = message.guild.name;
        var Uname = message.member.id;
        var tf = false;
        var tf2 = false;
        for(var i = 0; databases.servers.length > i; i++){
          if(databases.servers[i].name == Sname){
            databases.servers[i].buhcount += 1;
            databases.overall += 1;
            tf = true;
          }
        }
        for(var i = 0; databases.users.length > i; i++){
          if(databases.users[i].nameID == Uname){
            databases.users[i].buhcount += 1;
            tf2 = true;
          }
        }
        for(var i = 0; databases.users.length > i; i++){
          if(databases.users[i].nameID == Uname){
            if((databases.users[i].buhcount >= 11)&&(databases.users[i].buhcount <= 30)&&(databases.users[i].buhrank.includes('Toddler Buher') != true)){
                databases.users[i].buhrank = 'Toddler Buher';
                Embedsend(databases.users[i].buhrank, message);
            }
            else if((databases.users[i].buhcount >= 31)&&(databases.users[i].buhcount <= 60)&&(databases.users[i].buhrank.includes('Massive Buher') != true)){
                databases.users[i].buhrank = 'Massive Buher';
                Embedsend(databases.users[i].buhrank, message);
            }
            else if((databases.users[i].buhcount >= 61)&&(databases.users[i].buhcount <= 100)&&(databases.users[i].buhrank.includes('Ultra Daddy Buher') != true)){
                databases.users[i].buhrank = 'Ultra Daddy Buher';
                Embedsend(databases.users[i].buhrank, message);
            }
            else if((databases.users[i].buhcount >= 101)&&(databases.users[i].buhrank.includes('KING BUH') != true)){
                databases.users[i].buhrank = 'KING BUH';
                Embedsend(databases.users[i].buhrank, message);
            }
          }
        }
        if(tf == false){
          databases.servers.push({"name": message.guild.name,"buhcount":1});
          databases.overall += 1;
        }
        if(tf2 == false){
          databases.users.push({"nameID": message.member.id,"name": message.member.user.username,"buhcount":1,"buhrank":"Baby Buher"});
        }
        fs.writeFile('C:/Users/TheRetroGuy/Documents/GitHub/buhbot/BuhBot/count.json', JSON.stringify(databases), 'utf8', (err) => {

            if (err) {
                console.log(`Error writing file: ${err}`);
            } else {
                console.log(`File is written successfully!`);
            }
        
        });
    }
  }
}