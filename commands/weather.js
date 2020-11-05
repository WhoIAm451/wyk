const Discord = require("discord.js");
const weather = require('weather-js')
const fs = require("fs");
const config = require('../config.json')
exports.run = (client, message, args) => {

  try {

  if (message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: config.prefix
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;

weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {

  if(!result) {
    var HelpEmbed2 = new Discord.MessageEmbed()
      .setTitle(`Commande: weather`)
      .setColor(Math.floor(Math.random() * 16777214) + 1)
      .setDescription("Description: Donne la météo de l\'endroit souhaité" + "\n**Rappel**: Les crochets tels que [] ou <> ne sont pas a utiliser lors de l'utilisation des commandes.")
      .addField("Utilisation:", `${prefix}weather <Ville>`)
      .addField("Aliase:", `météo`)
      message.channel.send(HelpEmbed2);
    return;
  }

  
    if (result.length === 0) {
message.channel.send("S'il vous plaît, fournissez moi un emplacement **valide**")
return;
}

  var current = result[0].current;
  var location = result[0].location;

  if (current.skytext == 'Sunny') {
    var etat = "Ensoleillée";
  }

	if (err) message.channel.send(err);
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Météo pour ${current.observationpoint}`)
    .setThumbnail(current.imageUrl)
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .addField('Fuseau horaire', `UTC${location.timezone}`, true)
    .addField('Type de degré', location.degreetype, true)
    .addField('Temperature', `${current.temperature} Degrés`, true)
    .addField('Ressenti', `${current.feelslike} Degrés`, true)
    .addField('Les vents', current.winddisplay, true)
    .addField('Humidité', `${current.humidity}%`, true)
    .setFooter(client.user.username, client.user.displayAvatarURL).setTimestamp()
    message.channel.send(embed)
});
  
} catch(err) {
  console.error(err)
  return message.channel.send(':x: | Une erreur c\'est produite lors du traitement de la commande.\nVeuillez envoyer un report de la commande si ce message persiste')
};

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['météo'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'weather',
    description: 'Donne la météo de l\'endroit souhaité',
    usage: 'weather <Ville>',
    category: "info"
  };