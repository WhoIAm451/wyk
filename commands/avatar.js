const Discord = require("discord.js");
const sm = require("string-similarity");

exports.run = async (client, message, args) => {

try {

  if(message.author.bot) return;
  if(message.channel.type !== "text") return;
  
  let user = message.mentions.users.first();

  if (!user && args.slice().length === 0) {
    user = message.author;
  }
  else if (user) {
    if (user.bot) return message.channel.send(user.displayAvatarURL( {format: 'png', dynamic: true, size: 4096} ));
  }
  else {
      const fetchedMember = await message.guild.members.fetch(args.slice().join(' '));
      if (!fetchedMember) new Error('Utilisateur non trouver!');
      user = fetchedMember;
      user = user.user;
  }

  message.channel.send(user.displayAvatarURL( {format: 'png', dynamic: true, size: 4096} ))
    
  
                        } catch(err) {
                          console.error(err);
                          return message.channel.send(':x: | Une erreur c\'est produite lors du traitement de la commande.\nVeuillez envoyer un report de la commande si ce message persiste');
                        };
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['pp'],
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  description: 'Permet de voir votre avatar ou celui du\'n autre',
  usage: 'avatar',
  usage2: 'avatar <mention>',
  category: 'divers'
};
