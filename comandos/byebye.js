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
              if (message.content.startsWith(servidor.prefix + 'byebye set')) {
                if (!razaod.length < 1) {
                  servidor.byebye = true
                  servidor.byebyechannel = message.channel.id
                  servidor.byebyemsg = message.content.replace(`${servidor.prefix}byebye set `, '')
                  servidor.save()
                  message.channel.sendMessage(`<:check:438534229563801620> **Byebye setado para:** ${message.content.replace(`${servidor.prefix}byebye set`, '')}`)
                } else {
                  message.channel.sendMessage(':x: **Por favor, cite a mensagem de saida que deseja setar.**')
                }
              } else if (message.content.startsWith(servidor.prefix + 'byebye del')) {
                if (servidor.byebye) {
                  servidor.byebye = false
                  servidor.byebyechannel = 'Nenhum'
                  servidor.byebyemsg = 'Nenhuma'
                  servidor.save()
                  message.channel.sendMessage(`<:check:438534229563801620> **Byebye desativado neste servidor**`)
                } else {
                  message.channel.sendMessage('**:x: Não há um byebye setado neste servidor.**')
                }
              } else if (message.content.startsWith(servidor.prefix + 'byebye help')) {
                message.channel.sendMessage({
                  'embed': {
                    'title': '<a:engrenagem:440261266934857728> Byebye:',
                    'description': `**Mensagem setada:** ${servidor.byebyemsg}\n\n**Como usar:**\`\`\`\n{member} menciona o usuário.\n{name} nome do usuário.\n{guild} nome do servidor.\`\`\``,
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
                  'title': '<a:engrenagem:440261266934857728> Byebye:',
                  'description': `\`\`\`\n${servidor.prefix}byebye set <mensagem de saida>\n${servidor.prefix}byebye del\n${servidor.prefix}byebye help\`\`\``,
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
