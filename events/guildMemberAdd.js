const { MessageEmbed } = require("discord.js")
module.exports = (client) => { 
    function guildMemberAdd(member) {
    console.log("guildMemberAdd")
    const embed = new MessageEmbed()
    .setAuthor(`${member.displayName} (${member.id})`)
    .setColor("#35f092")
    .setDescription("New User")
    .setTimestamp();

    client.channels.cache.get('770289255607173151').send(embed)
    }
};