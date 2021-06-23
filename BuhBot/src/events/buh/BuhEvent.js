const BaseEvent = require('../../utils/structures/BaseEvent');
const fs = require('fs');
const discord = require('discord.js');


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
        var name = message.guild.name;
        var tf = false;
        for(var i = 0; databases.servers.length > i; i++){
          if(databases.servers[i].name == name){
            databases.servers[i].buhcount += 1;
            databases.overall += 1;
            tf = true;
          }
        }
        if(tf == false){
          databases.servers.push({"name": message.guild.name,"buhcount":1})
          databases.overall += 1;
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