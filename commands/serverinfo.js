const Discord = require('discord.js')
const moment = require ("moment")
const ms = require("ms");
const sm = require("string-similarity");

exports.run = (client, message, args) => {

  try {
    //moment.locale(message.client.provider.getGuild(message.guild.id, 'momentLanguage'));

    const servercreated = moment(message.guild.createdAt).format('MMMM Do YYYY, h:mm:ss a');

    let serverembed = new Discord.MessageEmbed()
    .setAuthor(`${message.guild.name}`, message.guild.iconURL())
    .setTitle(message.guild.name + " - Informations")
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setThumbnail(message.guild.iconURL())
    .addField ("Propriétaire du serveur:", `${message.guild.owner.user.tag}`,true)
    .addField ("ID:", `${message.guild.id}`,true)
    .addField("Membres", message.guild.memberCount, true)
    .addField('Niveau de vérification:', message.guild.verificationLevel || lang.serverinfo_noverification, true)
    .addField("Région:", message.guild.region, true)
    .addField("Date de création:", servercreated, true)
    .setFooter(client.user.username, client.user.displayAvatarURL).setTimestamp()

    message.channel.send(serverembed);

} catch(err) {
  console.error(err);
  return message.channel.send(':x: | Une erreur c\'est produite lors du traitement de la commande.\nVeuillez envoyer un report de la commande si ce message persiste');
};

}
 
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['si'],
    permLevel: 0
  };

  exports.help = {
    name: 'serverinfo',
    description: 'Donne les informations sur le seveur',
    usage: 'serverinfo',
    category: "info"
  };
