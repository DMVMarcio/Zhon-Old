const Discord = require('discord.js')
const client = new Discord.Client({})
const DBL = require('dblapi.js')
const dbl = new DBL(process.env.dbl, client)
const moment = require('moment')
require('moment-duration-format')
moment.locale('pt-BR')

exports.run = ({ client, message, args, language }, t) => {
  let botI = message.mentions.users.size > 0 ? message.mentions.users.first().bot ? message.mentions.users.first() : client.user : client.users.get(args[0]) ? client.users.get(args[0]).bot ? client.users.get(args[0]) : client.user : client.user

  dbl.getBot(botI.id).then(dbots => {
    var criado = moment(botI.createdAt).format('lll')
    var embed = new Discord.RichEmbed()
      .setColor(11676858)
      .setTimestamp(new Date())
      .setFooter(message.author.username, message.author.displayAvatarURL)
      .setThumbnail(botI.displayAvatarURL)
      .setAuthor(botI.username, botI.displayAvatarURL)
      .addField(':desktop: Discord Bot List:', `**[clique aqui](https://discordbots.org/bot/${botI.id})**`, true)
      .addField(':paperclip: Suporte:', dbots.support ? `**[clique aqui](https://discord.gg/${dbots.support})**` : "Nao possui suporte", true)
      .addField(':pushpin: Prefix:', dbots.prefix, true)
      .addField(':up: Votos:', dbots.points, true)
      .addField(':tools: Donos:', `<@${(dbots.owners.join('>, <@'))}>`, true)
      .addField(':books: Feito em:', dbots.lib, true)
      .addField(':calendar: Criado em:', criado, true)
      .addField(':ballot_box_with_check: Certificado:', `${dbots.certifiedBot ? "Sim" : "Não"}`, true)
      .addField(':pushpin: Tags:', `${dbots.tags}`, false)
      .addField(':pencil: Descrição:', dbots.shortdesc, false)
    message.channel.sendMessage(embed)
  }).catch(err => {
    if (err) throw err
    message.reply('**:thinking: O bot precisa estar registrado no DISCORD BOT LIST.**')
  })
}
