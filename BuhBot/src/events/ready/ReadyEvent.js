const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    client.user.setActivity('-helpbuh', {type: 'WATCHING'});
    console.log(client.user.tag + ' has logged in.');
  }
}