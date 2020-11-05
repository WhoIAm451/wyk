  const Discord = require('discord.js');

exports.run = async (client, message) => {

message.channel.send(`**${client.user.username} ping!** :ping_pong: ${client.ws.ping}ms`);

};
  
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'ping',
    description: 'Ping/Pong command, vous donne aussi le ping du bot.',
    usage: 'ping',
    category: "info"
  };
