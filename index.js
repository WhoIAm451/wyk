const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const chalk = require('chalk');
const fs = require('fs');
require('./util/eventLoader')(client);
const bluecolor = chalk.keyword('blue');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, filesfun) => {
  if (err) console.error(err);
  filesfun.forEach(f => {
    const props = require(`./commands/${f}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

function guildMemberRemove (member) {
  console.log(`Un utilisateur a quitter ${member.guild.name}`)
}
function guildMemberAdd (member) {
  console.log(`Nouvelle utilisateur '${member.user.username}' a rejoint '${member.guild.name}'` );
  member.guild.channels.cache.get('770289255607173151').send(`Bonjour, ${member.user.username}!`);
}
  class Routing {

    static guildMemberAdd (member) {
        guildMemberAdd(member)
    }

    static guildMemberRemove (member) {
        guildMemberRemove(member)
    }
}

client.on('guildMemberAdd', Routing.guildMemberAdd);
client.on('guildMemberRemove', Routing.guildMemberRemove);
console.log(bluecolor(`Commande prête !`));

client.login(process.env.TOKEN);
