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
              if (message.content.startsWith(servidor.prefix + 'welcome set')) {
                if (!razaod.length < 1) {
                  servidor.welcome = true
                  servidor.welcomechannel = message.channel.id
                  servidor.welcomemsg = message.content.replace(`${servidor.prefix}welcome set `, '')
                  servidor.save()
                  message.channel.sendMessage(`<:check:438534229563801620> **Welcome setado para:** ${message.content.replace(`${servidor.prefix}welcome set`, '')}`)
                } else {
                  message.channel.sendMessage(':x: **Por favor, cite a mensagem de entrada que deseja setar.**')
                }
              } else if (message.content.startsWith(servidor.prefix + 'welcome del')) {
                if (servidor.welcome) {
                  servidor.welcome = false
                  servidor.welcomechannel = 'Nenhum'
                  servidor.welcomemsg = 'Nenhuma'
                  servidor.save()
                  message.channel.sendMessage(`<:check:438534229563801620> **Welcome desativado neste servidor**`)
                } else {
                  message.channel.sendMessage('**:x: Não há um welcome setado neste servidor.**')
                }
              } else if (message.content.startsWith(servidor.prefix + 'welcome help')) {
                message.channel.sendMessage({
                  'embed': {
                    'title': '<a:engrenagem:440261266934857728> Welcome:',
                    'description': `**Mensagem setada:** ${servidor.welcomemsg}\n\n**Como usar:**\`\`\`\n{member} menciona o usuário.\n{name} nome do usuário.\n{users} quantidade de users ao entrar.\n{guild} nome do servidor.\`\`\``,
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
                  'title': '<a:engrenagem:440261266934857728> Welcome:',
                  'description': `\`\`\`\n${servidor.prefix}welcome set <mensagem de entrada>\n${servidor.prefix}welcome del\n${servidor.prefix}welcome help\`\`\``,
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
