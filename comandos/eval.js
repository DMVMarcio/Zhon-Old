const Discord = require('discord.js')
var database = require('../database.js')
const moment = require('moment')
require('moment-duration-format')
moment.locale('pt-BR')

exports.run = ({ client, message, args, language }, t) => {

    let razaou = args.slice(0).join(' ')

    database.Users.findOne({
      '_id': message.author.id
    }, function (userro, usuario) {
      if (usuario) {
        if (!usuario.ban) {
          if (usuario.owner || usuario.subowner) {
            if (!razaou.length < 1) {
              getEval(message, args)
            } else {
              message.channel.sendMessage('**<a:engrenagem:440261266934857728> Envie algum código.**')
            }
          } else {
            message.channel.sendMessage(`:x: **Ei ${message.author.username}, você não tem permissão para executar este comando!**`).then((value) => {
              setTimeout(() => {
                value.delete()
              }, 5000)
            })
          }
        } else {}
      } else {}
    })

    async function getEval (message, args) {
        if (message.content.includes('token')) return message.reply('**Me desculpe, más não mostrarei meu token aqui. :x:**')
        var code = args.join(' ')
        if (args[0].toLowerCase() === 'userdb') {
          return database.Users.findOne({
            _id: args.length === 1 ? message.author.id : message.mentions.users.first() ? message.mentions.users.first().id : args[1]
          }).then(user => message.channel.send(`\`\`\`js\n${user}\`\`\``))
        } else if (args[0].toLowerCase() === 'guilddb') {
          return database.Guilds.findOne({
            _id: args.length === 1 ? message.guild.id : args[1]
          }).then(server => message.channel.send(`\`\`\`js\n${server}\`\`\``))
        } else if (args[0].toLowerCase() === 'athenasdb') {
          return database.Athenas.findOne({
            _id: args.slice(1).join(" ").toLowerCase()
          }).then(athen => message.channel.send(`\`\`\`js\n${athen}\`\`\``))
        } else if (args[0].toLowerCase() === 'cmddb') {
          return database.Comandos.findOne({
            _id: args[1]
          }).then(comando => message.channel.send(`\`\`\`js\n${comando}\`\`\``))
        } else if (args[0].toLowerCase() === 'if') {
          code = `${args.slice(1).join(" ").toLowerCase()} ? true : false`
        }
        try {
          let evaled = await eval(code)
      
          if (evaled === null) evaled = 'null'
          if (evaled === undefined) evaled = 'undefined'
      
          var embed = new Discord.RichEmbed()
            .setColor(11676858)
            .setTimestamp(new Date())
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setThumbnail('https://i.imgur.com/0DEF4PI.png')
            .addField(':gear: Código:', `\`\`\`js\n${code}\`\`\``, false)
            .addField(':dvd: Resultado:', `\`\`\`LDIF\n${evaled}\`\`\``, false)
      
          message.channel.sendMessage(embed)
        } catch (err) {
          var embed2 = new Discord.RichEmbed()
            .setColor(16711680)
            .setTimestamp(new Date())
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setThumbnail('https://i.imgur.com/0DEF4PI.png')
            .addField(':gear: Código:', `\`\`\`js\n${code}\`\`\``, false)
            .addField(':x: Erro:', `\`\`\`LDIF\n${err}\`\`\``, false)
      
          message.channel.sendMessage(embed2)
        }
      }

}
