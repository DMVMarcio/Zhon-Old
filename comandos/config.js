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
              if (message.content.startsWith(servidor.prefix + 'config prefix')) {
                if (!razaod.length < 1) {
                  servidor.prefix = args[1]
                  servidor.save()
                  message.channel.sendMessage(`<:check:438534229563801620> **Prefix do servidor alterado para \`${args[1]}\`**`)
                } else {
                  message.channel.sendMessage('<a:engrenagem:440261266934857728> **Diga a prefix que deseja setar.**')
                }
              } else if (message.content.startsWith(servidor.prefix + 'config level')) {
                if (servidor.leveis) {
                  servidor.leveis = false
                  servidor.save()
                  message.channel.sendMessage(`<:check:438534229563801620> **Level desativado neste servidor**`)
                } else {
                  servidor.leveis = true
                  servidor.save()
                  message.channel.sendMessage(`<:check:438534229563801620> **Level ativado neste servidor**`)
                }
              } else if (message.content.startsWith(servidor.prefix + 'config coins')) {
                if (servidor.coins) {
                  servidor.coins = false
                  servidor.save()
                  message.channel.sendMessage(`<:check:438534229563801620> **Coins desativado neste servidor**`)
                } else {
                  servidor.coins = true
                  servidor.save()
                  message.channel.sendMessage(`<:check:438534229563801620> **Coins ativado neste servidor**`)
                }
              } else if (message.content.startsWith(servidor.prefix + 'config box')) {
                if (servidor.box) {
                  servidor.box = false
                  servidor.save()
                  message.channel.sendMessage(`<:check:438534229563801620> **Box desativado neste servidor**`)
                } else {
                  servidor.box = true
                  servidor.save()
                  message.channel.sendMessage(`<:check:438534229563801620> **Box ativado neste servidor**`)
                }
              } else {
                message.channel.sendMessage(':x: **Argumento inválido.**')
              }
            } else {
              message.channel.sendMessage({
                'embed': {
                  'title': '<a:engrenagem:440261266934857728> Config:',
                  'description': `\`\`\`\n${servidor.prefix}config level\n${servidor.prefix}config coins\n${servidor.prefix}config box\n${servidor.prefix}config prefix <prefix>\`\`\``,
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
