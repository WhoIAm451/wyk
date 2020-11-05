const Discord = require("discord.js");
const fs = require("fs");
const config = require('../config.json')
exports.run = (client, message, args) => {

try {
  const user = args[0];
  if (!user) return message.channel.send(':x: | Tu dois définir l\'ID de la personne à unban.\n```\nUtilisation: ' + prefix + "unban <ID>\n```");

    client.unbanAuth = message.author;

    if(!message.channel.permissionsFor(message.author).has("BAN_MEMBERS")) return message.channel.send(':x: | Tu n\'as pas les droits.\n```js\nTu dois avoir les droits: "Bannir des membres"\n```');
    if(!message.channel.permissionsFor(client.user).has("BAN_MEMBERS")) return message.channel.send(':x: | Tu n\'as pas les droits.\n```js\nJe dois avoir les droits: "Bannir des membres"\n```');

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
      prefixes[message.guild.id] = {
        prefixes: config.prefix
      };
    }
    let prefix = prefixes[message.guild.id].prefixes;

   
    message.guild.members.unban(user);
    message.channel.send(`:white_check_mark: | **<@${user}>** a bien été unban !`);

  } catch(err) {
    console.error(err);
    return message.channel.send(':x: | Une erreur c\'est produite lors du traitement de la commande.\nVeuillez envoyer un report de la commande si ce message persiste.');
  };
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['deban'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'unban',
    description: 'Unban un utilisateur.',
    usage: 'unban <ID>',
    category: 'admin'
  };
