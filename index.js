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
async function guildMemberAdd (member) {
  const Gifencoder = require('gifencoder');
  const { mkdirSync, readdirSync, rmdirSync } = require("fs");
  const extractFrames = require('gif-extract-frames');
  const Canvas = require("canvas");
  const avatar = await Canvas.loadImage(member.user.avatarURL);
  const extend = member.user.avatarURL.includes(".gif");


  Canvas.registerFont('./data/font/coolvetica_rg.ttf', {
      family: 'rg'
  });
  let res;

  const canvas = Canvas.createCanvas(400, 200);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(await  Canvas.loadImage("https://i.imgur.com/xtIhmOo.png"), 0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = '14pt rg';
  ctx.fillText(`(#${member.guild.memberCount})`, 15, 28);
  ctx.textAlign = "center";
  ctx.font = responsive(canvas, "Test1");
  ctx.fillText("Test2", canvas.width/2, 185);
  ctx.fillStyle = "#FFFFFF";

  ctx.beginPath();
  ctx.arc(195, 84, 68, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  ctx.fillRect(126, 15, 140, 140);
  ctx.beginPath();
  ctx.arc(195, 84, 64, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  console.log("ouesh")

  if (extend) {

      mkdirSync(`./data/user/${member.user.id}`);
      await extractFrames({
          input: member.user.avatarURL,
          output: `./data/user/${member.user.id}/frame-%d.png`
      });
      const userDir = readdirSync(`./data/user/${member.user.id}`);
      const encoder = new Gifencoder(canvas.width, canvas.height);
      encoder.start();
      encoder.setRepeat(0);
      encoder.setDelay(100);
      encoder.setQuality(10);
      for (let i = 0; i < userDir.length; i++) {
          ctx.drawImage(await loadImage(`./data/user/${member.user.id}/frame-${i}.png`), 131, 20, 128, 128);
          encoder.addFrame(ctx);
      }
      encoder.finish();
      res = {
          "buffer": encoder.out.getData(),
          "extend": "gif"
      };
  } else {
      ctx.drawImage(avatar, 131, 20, 128, 128);
      res = {
          "buffer": canvas.toBuffer(),
          "extend": "png"
      };
  }

member.guild.channels.cache.get('770289255607173151').send({
    file: res.buffer,
    name: `${member.user.id}.${res.extend}`
}).then(() => {
    if (extend) {
        rmdirSync(`./data/user/${member.user.id}`, {
            recursive: true
        });
    }
});
console.log(`Nouvelle utilisateur '${member.user.username}' a rejoint '${member.guild.name}'` );
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
