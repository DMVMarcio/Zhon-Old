const Discord = require('discord.js')
var database = require('../database.js')

exports.run = ({ client, message, args, language, usuario, servidor }, t) => {
  let razaou = args.slice(0).join(' ')
  let razaod = args.slice(1).join(' ')

      if (usuario.owner || usuario.subowner || usuario.dev || usuario.sup || message.member.hasPermission(['MANAGE_GUILD'])) {
            if (!razaou.length < 1) {
              if (message.content.startsWith(servidor.prefix + 'filter links')) {
                if (servidor.links) {
                  servidor.links = false
                  servidor.save()
                  message.channel.sendMessage(`<:check:438534229563801620> **Filtro de links desativado neste servidor**`)
                } else {
                  servidor.links = true
                  servidor.save()
                  message.channel.sendMessage(`<:check:438534229563801620> **Filtro de links ativado neste servidor**`)
                }
              } else if (message.content.startsWith(servidor.prefix + 'filter invites')) {
                if (servidor.invites) {
                  servidor.invites = false
                  servidor.save()
                  message.channel.sendMessage(`<:check:438534229563801620> **Filtro de invites desativado neste servidor**`)
                } else {
                  servidor.invites = true
                  servidor.save()
                  message.channel.sendMessage(`<:check:438534229563801620> **Filtro de invites ativado neste servidor**`)
                }
              } else if (message.content.startsWith(servidor.prefix + 'filter words')) {
                if (!razaod.length < 1) {
                  if (servidor.words.includes(message.content.toLowerCase().replace(`${servidor.prefix}filter words `, ''))) {
                    servidor.words.splice(servidor.words.indexOf(message.content.toLowerCase().replace(`${servidor.prefix}filter words `, '')), 1)
                    servidor.save()
                    message.channel.sendMessage(`<:check:438534229563801620> **Argumento ${message.content.toLowerCase().replace(`${servidor.prefix}filter words `, '')} removido.**`)
                  } else {
                    servidor.words.unshift(message.content.toLowerCase().replace(`${servidor.prefix}filter words `, ''))
                    servidor.save()
                    message.channel.sendMessage(`<:check:438534229563801620> **Argumento ${message.content.toLowerCase().replace(`${servidor.prefix}filter words `, '')} adicionado.**`)
                  }
                } else {
                  message.channel.sendMessage({
                    'embed': {
                      'description': `**<a:engrenagem:440261266934857728> Cite uma palavra**.\n\n:page_with_curl: **Palavras setadas:**\`\`\`\n${servidor.words.toString()}\`\`\``,
                      'color': 11676858,
                      'timestamp': new Date(),
                      'footer': {
                        'icon_url': message.author.displayAvatarURL,
                        'text': message.author.username
                      },
                      'thumbnail': {
                        'url': 'https://i.imgur.com/0DEF4PI.png'
                      }
                    }
                  })
                }
              } else {
                message.channel.sendMessage(t('comandos:filter.invalidArgs'))
              }
            } else {
              var embedNA = new Discord.RichEmbed()
                .setTitle('<a:engrenagem:440261266934857728> Filter:')
                .setDescription(`\`\`\`\n${servidor.prefix}filter links\n${servidor.prefix}filter invites\n${servidor.prefix}filter words <palavra>\`\`\``)
                .setColor(11676858)
                .setTimestamp(new Date())
                .setFooter(message.author.username, message.author.displayAvatarURL)
                .setThumbnail('https://i.imgur.com/0DEF4PI.png')
              message.channel.send(embedNA)
            }
      } else {
        message.channel.send(t('comandos:filter.noPerm'))
      }
}