const Discord = require('discord.js');
const translate = require('translate-google');
const fs = require("fs");
const config = require('../config.json')

const langs = {
    auto: 'Automatic',
    af: 'Afrikaans',
    sq: 'Albanian',
    ar: 'Arabic',
    hy: 'Armenian',
    az: 'Azerbaijani',
    eu: 'Basque',
    be: 'Belarusian',
    bn: 'Bengali',
    bs: 'Bosnian',
    bg: 'Bulgarian',
    ca: 'Catalan',
    ceb: 'Cebuano',
    ny: 'Chichewa',
    'zh-cn': 'Chinese Simplified',
    'zh-tw': 'Chinese Traditional',
    co: 'Corsican',
    hr: 'Croatian',
    cs: 'Czech',
    da: 'Danish',
    nl: 'Dutch',
    en: 'English',
    eo: 'Esperanto',
    et: 'Estonian',
    tl: 'Filipino',
    fi: 'Finnish',
    fr: 'French',
    fy: 'Frisian',
    gl: 'Galician',
    ka: 'Georgian',
    de: 'German',
    el: 'Greek',
    gu: 'Gujarati',
    ht: 'Haitian Creole',
    ha: 'Hausa',
    haw: 'Hawaiian',
    iw: 'Hebrew',
    hi: 'Hindi',
    hmn: 'Hmong',
    hu: 'Hungarian',
    is: 'Icelandic',
    ig: 'Igbo',
    id: 'Indonesian',
    ga: 'Irish',
    it: 'Italian',
    ja: 'Japanese',
    jw: 'Javanese',
    kn: 'Kannada',
    kk: 'Kazakh',
    km: 'Khmer',
    ko: 'Korean',
    ku: 'Kurdish (Kurmanji)',
    ky: 'Kyrgyz',
    lo: 'Lao',
    la: 'Latin',
    lv: 'Latvian',
    lt: 'Lithuanian',
    lb: 'Luxembourgish',
    mk: 'Macedonian',
    mg: 'Malagasy',
    ms: 'Malay',
    ml: 'Malayalam',
    mt: 'Maltese',
    mi: 'Maori',
    mr: 'Marathi',
    mn: 'Mongolian',
    my: 'Myanmar (Burmese)',
    ne: 'Nepali',
    no: 'Norwegian',
    ps: 'Pashto',
    fa: 'Persian',
    pl: 'Polish',
    pt: 'Portuguese',
    ma: 'Punjabi',
    ro: 'Romanian',
    ru: 'Russian',
    sm: 'Samoan',
    gd: 'Scots Gaelic',
    sr: 'Serbian',
    st: 'Sesotho',
    sn: 'Shona',
    sd: 'Sindhi',
    si: 'Sinhala',
    sk: 'Slovak',
    sl: 'Slovenian',
    so: 'Somali',
    es: 'Spanish',
    su: 'Sudanese',
    sw: 'Swahili',
    sv: 'Swedish',
    tg: 'Tajik',
    ta: 'Tamil',
    te: 'Telugu',
    th: 'Thai',
    tr: 'Turkish',
    uk: 'Ukrainian',
    ur: 'Urdu',
    uz: 'Uzbek',
    vi: 'Vietnamese',
    cy: 'Welsh',
    xh: 'Xhosa',
    yi: 'Yiddish',
    yo: 'Yoruba',
    zu: 'Zulu'
  }

module.exports.run = async (bot, message, args) => {

    try {
        function getCode(desiredLang) {
            if (!desiredLang) {
              return false
            }
            desiredLang = desiredLang.toLowerCase()
            if (langs[desiredLang]) {
              return desiredLang
            }
            var keys = Object.keys(langs).filter(key => {
              if (typeof langs[key] !== 'string') {
                return false
              }
              return langs[key].toLowerCase() === desiredLang
            })
            return keys[0] || false
        }
        
        let embed = new Discord.MessageEmbed()
        .setColor()
        .setDescription("Cliquez [ici](https://github.com/dqszxdbcyezfckq/translate_const_api/blob/main/language.js) pour avoir toute les langues disponibles.")
        if (args[0] === "langue") return message.channel.send(embed)

        if (message.author.bot) return;
        if(message.channel.type === "dm") return;
  
        let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
        if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: config.prefix
        };
        }
        let prefix = prefixes[message.guild.id].prefixes;

        if (!args[0]) {

            message.channel.send(`:x: | Traduit une phrase ou un mot dans le language choisie\n**Usage: ${prefix}translate <langage> <text>**`);

        } else {

            if (args.length === undefined) {

                return message.channel.send(`:x: | **Donné un mot ou une phrase.** \`${prefix}translate <langage> <text>\``);

            } else {
                let transArg = args[0].toLowerCase();

                args = args.join(' ').slice(1)

                toto = getCode(transArg)

    
                //if (!langs.includes(transArg)) return message.channel.send(":x: | **Langage indisponible**. Langage disponible : ").then(message.channel.send(langs.join(", "), {code:'ascii'}));
                args = args.slice(transArg.length);


                translate(args, {to: toto}).then(res => {
                    message.channel.send(res)

                }).catch(err => {
                    console.error(err)
                });

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
    aliases: ['ts'],
    permLevel: 0
  };

  exports.help = {
    name: 'translate',
    description: 'Traduit une phrase ou un mot dans le language choisie',
    usage: 'translate <langage> <text>',
    category: "info"
  };