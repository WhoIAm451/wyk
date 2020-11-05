const { MessageEmbed } = require("discord.js")
module.exports = (client, member) => { 
    console.log("guildMemberRemove")
    const embed = new MessageEmbed()
    .setAuthor(`${member.displayName} (${member.id})`)
    .setColor("#35f092")
    .setDescription("New User")
    .setTimestamp();
    
    client.channels.cache.get('770289255607173151').send(embed)
};