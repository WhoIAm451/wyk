const Discord = require("discord.js")
const fs = require("fs")
const config = require('../config.json')
exports.run = (client, message, args) => {

  try {

   let prefix = config.prefix
  if(!message.channel.permissionsFor(message.author).has("BAN_MEMBERS")) return message.channel.send(':x: | Tu n\'as pas les droits.\n```js\nTu dois avoir les droits: "Bannir des membres"\n```');
  if(!message.channel.permissionsFor(client.user).has("BAN_MEMBERS")) return message.channel.send(':x: | Je n\'ai pas les droits.\n```js\nJe dois avoir les droits: "Bannir des membres"\n```');

    if(!args[0]) return message.channel.send(':x: | Tu dois mentionner un utilisateur à ban.');

  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send(":x: | Je ne trouve pas cette utilisateur.");
    
 const user = message.mentions.users.first();
 if(!user) return message.channel.send(':x: | Tu dois mentionner un utilisateur à ban.');
  const member = message.guild.member(user) || null;
     if (member) {
      if (user.id === message.author.id) { 
          message.channel.send(':x: |Tu ne peux pas faire ça sur toi même');
   }else if (member.roles.highest>= message.member.roles.highest)
       return message.channel.send(':x: | Le membre ciblé a une position plus ou égale a la vôtre au niveau des rôle.');
    }





  message.channel.send(`:white_check_mark: | **<@${bUser.id}>** a été ban avec succès !`);
  message.guild.member(bUser).ban();
  
} catch(err) {
  console.error(err);
  return message.channel.send(':x: | Une erreur c\'est produite lors du traitement de la commande.\nVeuillez envoyer un report de la commande si ce message persiste.');
};

}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['b'],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'Ban l\'utilisateur mentionné',
  usage: 'ban <mention>',
  category: 'admin'
};
