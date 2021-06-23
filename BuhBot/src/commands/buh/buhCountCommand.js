const BaseCommand = require('../../utils/structures/BaseCommand');
const fs = require('fs');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('buhcount', 'counter', []);
  }

  async run(client, message, args) {

    const data = fs.readFileSync('C:/Users/TheRetroGuy/Documents/GitHub/buhbot/BuhBot/count.json', 'utf8');
    var databases = JSON.parse(data);
    var name = message.guild.name;
    var tf = false;
    for(var i = 0; databases.servers.length > i; i++){
      if(databases.servers[i].name == name){
        message.channel.send(databases.servers[i].buhcount + " buhs have been made!");
        tf = true;
      }
    }
    if(tf == false){
      message.channel.send("No buhs have been made!");
    }
  }
}