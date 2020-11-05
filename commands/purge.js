const Discord = require('discord.js');
exports.run = (client, message, args) => {

  try {
    
    const messagecount = parseInt(args.join(' '));
  if(!messagecount) return message.channel.send(".")

  if(!message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES")) return message.channel.send(':x: | Tu n\'as pas les droits.\nTu dois avoir les droits: "Gérer les messages"\n```');
  if(!message.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) return message.channel.send(':x: | Je n\'ai pas les droits.\nTu dois avoir les droits: "Gérer les messages"\n```');
  
  message.channel.messages.fetch({
    limit: messagecount + 1
  }).then(messages => message.channel.bulkDelete(messages));

} catch(err) {
  console.error(err)
  return message.channel.send(':x: | Une erreur c\'est produite lors du traitement de la commande.\nVeuillez envoyer un report de la commande si ce message persiste.')
};

};



  
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'clear',
    description: 'clear X nombre de message.',
    usage: 'clear <nombre>',
    category: "mod"
  };
  
