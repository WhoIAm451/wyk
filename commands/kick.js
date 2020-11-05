const { DiscordAPIError } = require("discord.js");
const Discord = require("discord.js")

exports.run = async (client, message, args) => {

  try {
    const reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();

    let member;
    if(user) {
      member = await message.guild.members.fetch(user)
    }
    
    if(!message.channel.permissionsFor(message.author).has("KICK_MEMBERS")) return message.channel.send(':x: | Tu n\'as pas les droits.\n```js\nTu dois avoir les droits: "Exclure des membres"\n```');
    if(!message.channel.permissionsFor(client.user).has("KICK_MEMBERS")) return message.channel.send(':x: | Je n\'ai pas les droits.\n```js\nJe dois avoir les droits: "Exclure des membres"\n```');

    if (member.roles.highest>= message.member.roles.highest)
       return message.channel.send(':x: | Le membre ciblé a une position plus haute ou égale a la vôtre.');

    if(!user) {
      try {
        const fetchedMember = await message.guild.members.fetch(args.slice(0, 1).join(' '));
        if(!fetchedMember) throw new Error('Utilisateur non trouver!');
        member = fetchedMember;
        user = fetchedMember;
        user = user.user;
      }
      catch(error){
        return message.reply("Utilisateur non trouver sur le serveur.")
      }
    }

    if(user === message.author) return message.channel.send("Vous ne pouvez pas vous kick vous même.");
    //if(!reason) return message.reply("Vous devez spécifiez une raison.");

    if(!member.kickable) return message.reply("Vous n'avez pas les permissions pour kick.");
    await member.kick();

    const kicked = (user.tag + "a bien été kick.");
    const kickembed = new Discord.MessageEmbed()
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setDescription(`✅ ${kicked}`)
    message.channel.send({embed: kickembed});

  } catch(err) {
    console.error(err)
    return message.channel.send(':x: | Une erreur c\'est produite lors du traitement de la commande.\nVeuillez envoyer un report de la commande si ce message persiste.')
  };

}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['k'],
  permLevel: 0
};

exports.help = {
  name: 'kick',
  description: 'Kick l\'utilisateur mentionné',
  usage: 'kick <mention>',
  category: "mod"
};
