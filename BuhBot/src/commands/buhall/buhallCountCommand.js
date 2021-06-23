const BaseCommand = require('../../utils/structures/BaseCommand');
const fs = require('fs');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('buhall', 'counter', []);
  }

  async run(client, message, args) {

    const data = fs.readFileSync('C:/Users/TheRetroGuy/Documents/GitHub/buhbot/BuhBot/count.json', 'utf8');
    var databases = JSON.parse(data);
    message.channel.send(databases.overall + " buhs have been made in all my connected servers!");
  }
}