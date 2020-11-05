const Discord = require('discord.js');
const fs = require("fs");

exports.run = async (client, message, args) => {

try{

  let member = message.mentions.members.first();
  let role = message.guild.roles.cache.find(r => r.name === 'Mute');
  
  if(!message.channel.permissionsFor(message.author).has("MANAGE_ROLES")) return message.channel.send(':x: | Tu n\'as pas les droits.\n```js\nTu dois avoir les droits: "Gerer les rôles"\n```');
  if(!message.channel.permissionsFor(client.user).has("MANAGE_ROLES")) return message.channel.send(':x: | Je n\'ai pas les droits.\n```js\nJe dois avoir les droits: "Gerer les rôles"\n```');
  if(member.roles.cache.find(muterole => muterole === role)) return message.channel.send(`${member.user.username} est deja mute.`);
  member = message.guild.member(member);
  if (member.roles.highest>= message.member.roles.highest)
       return message.channel.send(':x: | Le membre ciblé a une position plus haute ou égale a la vôtre.');
  if (!role) {
    await message.guild.roles.create({
        data:{
            name: "Mute",
            color: "#414141",
            permissions:[]
        }

    }).then((roleCreate) => {
        role = roleCreate;
    })
}
  message.guild.channels.cache.forEach(async (channel, i) => {
    await channel.createOverwrite(role, {
      SEND_MESSAGES: false
    });
  });



  let membermention;
  if (member){
    membermention = await message.guild.members.fetch(member);
  }

  if(!member){
    try{
      const fetchedMember = await message.guild.members.fetch(args.slice(0, 1).join(' '));
      if(!fetchedMember) throw new Error('Utilisateur non trouver!');
      member = fetchedMember;
      membermention = fetchedMember;
      member = member.member;
    }
    catch(error){
      return message.reply("Utilisateur non trouver sur le serveur.");
    }
  }

  member.roles.add(role)

  const mute = (member.user.tag + " est mute.");
  const mutemebed = new Discord.MessageEmbed()
  .setColor()
  .setDescription(`✅ ${mute}`)
  message.channel.send({embed: mutemebed});

} catch(err) {
  console.error(err)
  return message.channel.send(':x: | Une erreur c\'est produite lors du traitement de la commande.\nVeuillez envoyer un report de la commande si ce message persiste.')
};
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'mute',
  description: 'Mute l\'utilisateur mentionn.',
  usage: 'mute <mention>',
  category: "mod"
};
