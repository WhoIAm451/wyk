const Discord = require('discord.js');
const fs = require("fs");
const config = require('../config.json')
exports.run = async (client, message, params) => {

  try {
    let prefix = config.prefix
    if (message.author.bot) return;
    if(message.channel.type === "dm") return;
  if (!params[0]) {
    const HelpEmbed = new Discord.MessageEmbed()

    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setTitle("**Liste des catégories de commandes**")
    .setDescription("Utilise " + prefix + " help <nom de la commande> pour avoir plus d'information.")
    .addField("**Commandes :**", `ban, kick, unban, mute, unmute, clear\nserverinfo, botinfo, userinfo, avatar, ping\ntranslate, weather`)
    .setFooter(client.user.username, client.user.displayAvatarURL).setTimestamp()
    message.channel.send(HelpEmbed)

  } else {

    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      var HelpEmbed3 = new Discord.MessageEmbed()
      .setTitle(`Commande: ${command.help.name}`)
      .setColor(Math.floor(Math.random() * 16777214) + 1)
      .setDescription("**Description**: " + command.help.description + "\n**Rappel**: Les \"<>\" ne sont pas a utiliser lors de l'éxecution de la commande.")
      .addField("**Utilisation**:", `${command.help.usage2 ? `${prefix+command.help.usage}\n${prefix+command.help.usage2}` : `${prefix+command.help.usage}`} `)
      .addField("**Aliase**:", `${command.conf.aliases.join(", ")}` || "Il n'y a pas d'aliase.")
      .setFooter(client.user.username, client.user.displayAvatarURL).setTimestamp()
      message.channel.send(HelpEmbed3);
    }
  }
} catch(err) {
  console.error(err);
  return message.channel.send(':x: | Une erreur c\'est produite lors du traitement de la commande.\nVeuillez envoyer un report de la commande si ce message persiste');
};

};



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'aide'],
};

exports.help = {
  name: 'help',
  description: 'Montre tout les commandes existantes sur le bot',
  usage: 'help <command>',
  category: 'info'
};