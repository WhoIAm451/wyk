const settings = require('../config.json');

const fs = require("fs");
module.exports = message => {
  const client = message.client;
  if (message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = settings.prefix
  if(!message.content.startsWith(prefix)) return;

  const command = message.content.split(' ')[0].slice(prefix.length);
  const params = message.content.split(' ').slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    cmd.run(client, message, params);
  }

};
