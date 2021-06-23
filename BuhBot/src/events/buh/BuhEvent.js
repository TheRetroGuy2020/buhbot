const BaseEvent = require('../../utils/structures/BaseEvent');
const fs = require('fs');


module.exports = class BuhEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) return;
    if(message.content.startsWith(client.prefix)) return;
    if (message.content.includes('buh') == true) {
        const data = fs.readFileSync('C:/Users/TheRetroGuy/Documents/GitHub/buhbot/BuhBot/count.json', 'utf8');
        var databases = JSON.parse(data);
        databases.buhcount += 1;
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