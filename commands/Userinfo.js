const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const ms = require('ms');
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
      if (user.bot) return message.reply("Vous ne pouvez pas obtenir d'informations sur les bots!");
    }
    else {
        const fetchedMember = await message.guild.members.fetch(args.slice().join(' '));
        if (!fetchedMember) new Error('Utilisateur non trouver!');
        user = fetchedMember;
        user = user.user;
    }

    const member = message.guild.member(user) || await message.guild.members.fetch(user);
    const userondiscord = moment(user.createdTimestamp).format('MMMM Do YYYY, h:mm:ss a');
    const useronserver = moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a');

    if (user.presence.status == 'online') {
      var etat = "En Ligne";
    } else if (user.presence.status == "offline") {
      var etat = "Deconnecter";
    } else if (user.presence.status == "idle") {
      var etat = "Inactif";
    } else if (user.presence.status == "dnd") {
      var etat = "Ne pas deranger";
    }

    let uEmbed = new Discord.MessageEmbed()
    .setTitle(`${user.tag} - Informations`, user.displayAvatarURL())
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setThumbnail(user.displayAvatarURL())
    .addField("ID:", user.id, true)
    .addField("Pseudo serveur:", `${user.nickname ? user.nickname : "Pas de pseudo modifié"}`, true)
    .addField("Statut",user.presence.status, true)
    .addField("Jeux", `${user.presence.activity ? `${user.presence.activity.name}` : "Ne joue a rien"}`, true)
    //.addField("Rôle", member.roles.filter((r) => r.name !== '@everyone').map((role) => role.name).join(', ') || "N'a pas de rôles")
    .addField("Création du compte", userondiscord,false)
    .addField("Date d'arrivée sur le serv", useronserver,false)

    message.channel.send(uEmbed);
    } catch(err) {
      console.error(err)
      return message.channel.send(':x: | Une erreur c\'est produite lors du traitement de la commande. Veuillez envoyer un report de la commande si ce message persiste')
    };
  
  }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ui'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'userinfo',
    description: 'Donne les informations sur l\'utilisateur',
    usage: 'userinfo <mention>',
    category: "info"
};
