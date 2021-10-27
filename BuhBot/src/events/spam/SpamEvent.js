const BaseEvent = require('../../utils/structures/BaseEvent');
const fs = require('fs');
const discord = require('discord.js');

function Embedsend(message){
  const embedLead = new discord.MessageEmbed()
  .setColor('#ff0000')
  .setTitle(message.member.user.username)
  .setDescription("User has been kicked for possible spam")
  .setThumbnail(message.member.user.avatarURL())
  .addFields(
      { name: "Users Message", value: (message.content)}
  )
  .setFooter('Made by @JaxTheShep#3609', 'https://i.imgur.com/BdSIFXc.png');
  message.channel.send(embedLead);
}
function EmbedsendChannel(message, channelid){
  const embedLead = new discord.MessageEmbed()
  .setColor('#ff0000')
  .setTitle(message.member.user.tag)
  .setDescription("User has been kicked for possible spam")
  .setThumbnail(message.member.user.avatarURL())
  .addFields(
      { name: "Users Message", value: (message.content)}
  )
  .setFooter('Made by @JaxTheShep#3609', 'https://i.imgur.com/BdSIFXc.png');
  let channel = message.guild.channels.cache.get(channelid);
  channel.send(embedLead);
}
function EmbedsendUser(message){
  const embedLead = new discord.MessageEmbed()
  .setColor('#ff0000')
  .setTitle(message.guild.name)
  .setDescription("You have been kicked for possible spam from the server ")
  .setThumbnail(message.member.user.avatarURL())
  .addFields(
      { name: "Users Message", value: (message.content)}
  )
  .setFooter('Made by @JaxTheShep#3609', 'https://i.imgur.com/BdSIFXc.png');
  message.author.send(embedLead);
}


const usersMap = new Map();
const LIMIT = 5;
const DIFF = 2000;

module.exports = class BuhEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) return;
    if(message.content.startsWith(client.prefix)) return;
    const data = fs.readFileSync('C:/Users/Administrator/Desktop/buhbot/BuhBot/servermod.json', 'utf8');
    var databases = JSON.parse(data);
    var Sname = message.guild.name;
    var modChannel;
    var Uname = message.author.id;

    if(usersMap.has(message.author.id)) {
      const userData = usersMap.get(message.author.id);
      const { lastMessage, timer } = userData;
      const difference = message.createdTimestamp - lastMessage.createdTimestamp;
      let msgCount = userData.msgCount;
      console.log(difference);

      if(difference > DIFF) {
          clearTimeout(timer);
          console.log('Cleared Timeout');
          userData.msgCount = 1;
          userData.lastMessage = message;
          userData.timer = setTimeout(() => {
              usersMap.delete(message.author.id);
              console.log('Removed from map.')
          }, 3000);
          usersMap.set(message.author.id, userData)
      }
      else {
        if(message.content == lastMessage.content){
          if(message.channel != lastMessage.channel){
            ++msgCount;
            // console.log(message.channel.id);
            // channels += message.channel.id;
            if(parseInt(msgCount) === LIMIT) {
              EmbedsendUser(message);
              var tf = false;
              for(var i = 0; databases.servers.length > i; i++){
                if(databases.servers[i].name == Sname){
                  modChannel = databases.servers[i].serversmod;
                  tf = true;
                }
              }
              if(tf == false){
                Embedsend(message);
                let user = message.member
                let userid = message.member.id
                user.ban({days:1,reason: 'Spam'});
                message.guild.members.unban(userid);
                return;
              }
              EmbedsendChannel(message, modChannel);
              let user = message.member
              let userid = message.member.id
              user.ban({days:1,reason: 'Spam'});
              message.guild.members.unban(userid);
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
          }
        }
      }
  }
  else {
      let fn = setTimeout(() => {
          usersMap.delete(message.author.id);
          console.log('Removed from map.')
      }, 3000);
      usersMap.set(message.author.id, {
          msgCount: 1,
          lastMessage : message,
          timer : fn
      });
  }
    // if (lower.includes("everyone, take nitro faster, it's already running out") == true) {

    //     const data = fs.readFileSync('F:/Users/TheRetroGuy/Documents/GitHub/buhbot/BuhBot/servermod.json', 'utf8');
    //     var databases = JSON.parse(data);
    //     var Sname = message.guild.name;
    //     var modChannel;
    //     var Uname = message.author.id;
    //     EmbedsendUser(message);

    //     var tf = false;
    //     for(var i = 0; databases.servers.length > i; i++){
    //       if(databases.servers[i].name == Sname){
    //         modChannel = databases.servers[i].serversmod;
    //         tf = true;
    //       }
    //     }
    //     if(tf == false){
    //       Embedsend(message);
    //       message.author.kick("Spam");
    //       return;
    //     }
    //     EmbedsendChannel(message, modChannel);
    //     for(var i = 0; databases.users.length > i; i++){
    //       if(databases.users[i].nameID == Uname){
    //         databases.users[i].buhcount += 1;
    //         tf2 = true;
    //       }
    //     }
    //     for(var i = 0; databases.users.length > i; i++){
    //       if(databases.users[i].nameID == Uname){
    //         if((databases.users[i].buhcount >= 11)&&(databases.users[i].buhcount <= 30)&&(databases.users[i].buhrank.includes('Toddler Buher') != true)){
    //             databases.users[i].buhrank = 'Toddler Buher';
    //             Embedsend(databases.users[i].buhrank, message);
    //         }
    //         else if((databases.users[i].buhcount >= 31)&&(databases.users[i].buhcount <= 60)&&(databases.users[i].buhrank.includes('Massive Buher') != true)){
    //             databases.users[i].buhrank = 'Massive Buher';
    //             Embedsend(databases.users[i].buhrank, message);
    //         }
    //         else if((databases.users[i].buhcount >= 61)&&(databases.users[i].buhcount <= 100)&&(databases.users[i].buhrank.includes('Ultra Daddy Buher') != true)){
    //             databases.users[i].buhrank = 'Ultra Daddy Buher';
    //             Embedsend(databases.users[i].buhrank, message);
    //         }
    //         else if((databases.users[i].buhcount >= 101)&&(databases.users[i].buhcount <= 499)&&(databases.users[i].buhrank.includes('KING BUH') != true)){
    //             databases.users[i].buhrank = 'KING BUH';
    //             Embedsend(databases.users[i].buhrank, message);
    //         }
    //         else if((databases.users[i].buhcount >= 500)&&(databases.users[i].buhrank.includes('THE GOD OF BUH') != true)){
    //           databases.users[i].buhrank = 'THE GOD OF BUH';
    //           Embedsend(databases.users[i].buhrank, message);
    //       }
    //       }
    //     }
    //     if(tf == false){
    //       databases.servers.push({"name": message.guild.name,"buhcount":1});
    //       databases.overall += 1;
    //     }
    //     if(tf2 == false){
    //       databases.users.push({"nameID": message.member.id,"name": message.member.user.username,"buhcount":1,"buhrank":"Baby Buher"});
    //     }
    //     fs.writeFile('C:/Users/Administrator/Desktop/BuhBot/buhbot/BuhBot/count.json', JSON.stringify(databases), 'utf8', (err) => {

    //         if (err) {
    //             console.log(`Error writing file: ${err}`);
    //         } else {
    //             console.log(`File is written successfully!`);
    //         }
        
    //     });
    // }
  // }
}
}