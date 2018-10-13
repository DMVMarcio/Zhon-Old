var database = require('../database.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  let razaou = args.slice(0).join(' ')
  let razaod = args.slice(1).join(' ')

  database.Users.findOne({
    '_id': message.author.id
  }, function (erro, usuario) {
    if (usuario) {
      if (usuario.owner || usuario.subowner || usuario.dev || usuario.sup || message.member.hasPermission(['MANAGE_GUILD'])) {
        database.Guilds.findOne({
          '_id': message.guild.id
        }, function (servro, servidor) {
          if (servidor) {
            if (!razaou.length < 1) {
              if (message.content.startsWith(servidor.prefix + 'autorole set')) {
                if (!razaod.length < 1) {
                  if (message.mentions.roles.size > 0) {
                    if (message.guild.roles.get(message.mentions.roles.first().id).position < message.guild.members.get(client.user.id).highestRole.position) {
                      servidor.autorole = true
                      servidor.autoroleid = message.mentions.roles.first().id
                      servidor.save()
                      message.channel.sendMessage(`<:check:438534229563801620> **Autorole setado para:** ${message.mentions.roles.first().name}`)
                    } else {
                      message.channel.sendMessage(':x: **O cargo deve estar abaixo do meu.**')
                    }
                  } else {
                    message.channel.sendMessage(':x: **Por favor, mencione o cargo que deseja setar.**')
                  }
                } else {
                  message.channel.sendMessage(':x: **Por favor, mencione o cargo que deseja setar.**')
                }
              } else if (message.content.startsWith(servidor.prefix + 'autorole del')) {
                if (servidor.autorole) {
                  servidor.autorole = false
                  servidor.autoroleid = 'Nenhum'
                  servidor.save()
                  message.channel.sendMessage(`<:check:438534229563801620> **Autorole desativado neste servidor**`)
                } else {
                  message.channel.sendMessage('**:x: Não há um autorole setado neste servidor.**')
                }
              } else if (message.content.startsWith(servidor.prefix + 'autorole help')) {
                message.channel.sendMessage({
                  'embed': {
                    'title': '<a:engrenagem:440261266934857728> Autorole:',
                    'description': `**Cargo setado:** <@&${servidor.autoroleid}>`,
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
              } else {
                message.channel.sendMessage(':x: **Argumento inválido.**')
              }
            } else {
              message.channel.sendMessage({
                'embed': {
                  'title': '<a:engrenagem:440261266934857728> Autorole:',
                  'description': `\`\`\`\n${servidor.prefix}autorole set <menção do cargo>\n${servidor.prefix}autorole del\n${servidor.prefix}autorole help\`\`\``,
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
            message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
          }
        })
      } else {
        message.reply('**Sem permissão. <a:engrenagem:440261266934857728>**')
      }
    } else {
      message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
    }
  })
}
