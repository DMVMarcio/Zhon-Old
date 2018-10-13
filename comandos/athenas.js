var database = require('../database.js')
var athUser = []
var athFrase = []

exports.run = ({ client, message, args, lang, language }, t) => {
  let razaou = args.slice(0).join(' ')
  let razaod = args.slice(1).join(' ')

  database.Users.findOne({
    '_id': message.author.id
  }, function (erro, usuario) {
    if (usuario) {
      database.Guilds.findOne({
        '_id': message.guild.id
      }, function (servro, servidor) {
        if (servidor) {
          message.channel.createWebhook('Athenas', 'https://i.imgur.com/O6u2A36.png').then(wathenas => {
            if (!razaou.length < 1) {
              if (message.content.startsWith(servidor.prefix + 'athenas add')) {
                if (!razaod.length < 1) {
                  database.Athenas.findOne({
                    '_id': args.slice(1).join(" ").toLowerCase()
                  }, function (atherro, athenas) {
                    if (athenas) {
                      if (athenas.respostas.length >= 150) {
                        wathenas.sendMessage('**:x: Limite de 150 respostas atingido.**')
                      } else {
                        athFrase.unshift(args.slice(1).join(" ").toLowerCase())
                        athUser.unshift(message.author.id)
                        message.channel.sendMessage(`:thinking: | **Quando alguem dizer \`${args.slice(1).join(" ").toLowerCase()}\` oque devo responder?**`)
                        message.channel.awaitMessages(mensagem => mensagem.author.id === message.author.id, {
                          maxMatches: 1,
                          time: 20000,
                          errors: ['time']
                        }).then((coletado) => {
                          var resposta
                          resposta = coletado.first().content
                          if (athenas.respostas.includes(resposta)) {
                            wathenas.sendMessage('**:x: Resposta já existente para este argumento.**')
                          } else {
                            athenas.respostas.unshift(resposta)
                            athenas.save()
                            message.channel.sendMessage(`:thinking: | **A resposta para \`${athFrase[athUser.indexOf(message.author.id)]}\` agora é \`${resposta}\`.**`)
                            athFrase.splice(athUser.indexOf(message.author.id), 1)
                            athUser.splice(athUser.indexOf(message.author.id), 1)
                          }
                        }, function () {
                          athFrase.splice(athUser.indexOf(message.author.id), 1)

                          athUser.splice(athUser.indexOf(message.author.id), 1)

                          message.channel.sendMessage('**:x: Seu tempo esgotou.**')
                        })
                      }
                    } else {
                      athFrase.unshift(args.slice(1).join(" ").toLowerCase())
                      athUser.unshift(message.author.id)
                      message.channel.sendMessage(`:thinking: | **Quando alguem dizer \`${args.slice(1).join(" ")}\` oque devo responder?**`)
                      message.channel.awaitMessages(mensagem => mensagem.author.id === message.author.id, {
                        maxMatches: 1,
                        time: 20000,
                        errors: ['time']
                      }).then((coletado) => {
                        var resposta
                        resposta = coletado.first().content
                        var aths = new database.Athenas({
                          _id: athFrase[athUser.indexOf(message.author.id)].toLowerCase(),
                          respostas: [resposta]
                        })
                        aths.save()
                        message.channel.sendMessage(`:thinking: | **A resposta para \`${athFrase[athUser.indexOf(message.author.id)]}\` agora é \`${resposta}\`.**`)
                        athFrase.splice(athUser.indexOf(message.author.id), 1)
                        athUser.splice(athUser.indexOf(message.author.id), 1)
                      }, function () {
                        athFrase.splice(athUser.indexOf(message.author.id), 1)

                        athUser.splice(athUser.indexOf(message.author.id), 1)

                        message.channel.sendMessage('**:x: Seu tempo esgotou.**')
                      })
                    }
                  })
                } else {
                  message.channel.sendMessage('**:x: Cite a sua pergunta.**')
                }
              } else if (message.content.startsWith(servidor.prefix + 'athenas check')) {
                if (!razaod.length < 1) {
                  database.Athenas.findOne({
                    '_id': args.slice(1).join(" ").toLowerCase()
                  }, function (atherro, athenas) {
                    if (athenas) {
                      message.channel.sendMessage({
                        'embed': {
                          'title': `<:Athenas:449341605451923466> ${athenas._id}:`,
                          'description': `**Respostas (${athenas.respostas.length}):**\n\`${athenas.respostas.join('` **|** `')}\``,
                          'color': 11676858,
                          'timestamp': new Date(),
                          'footer': {
                            'icon_url': message.author.displayAvatarURL,
                            'text': message.author.username
                          },
                          'thumbnail': {
                            'url': 'https://i.imgur.com/O6u2A36.png'
                          }
                        }
                      })
                    } else {
                      wathenas.sendMessage('**:x: Frase não encontrada.**')
                    }
                  })
                } else {
                  wathenas.sendMessage('**:x: Por favor, cite a frase.**')
                }
              } else {
                database.Athenas.findOne({
                  '_id': args.join(" ").toLowerCase()
                }, function (atherro, athenas) {
                  if (athenas) {
                    var random = Math.round(Math.random() * athenas.respostas.length)
                    wathenas.sendMessage(`${message.author}, ${athenas.respostas[athenas.respostas.length === 1 ? 0 : random === 0 ? random + 1 : random - 1]}`)
                  } else {
                    wathenas.sendMessage(`**:x: Não encontrei uma resposta para isso, use \`${servidor.prefix}athenas add <pergunta>\` para adicionar uma.**`)
                  }
                })
              }
            } else {
              message.channel.sendMessage({
                'embed': {
                  'title': '<:Athenas:449341605451923466> Athenas:',
                  'description': `\`\`\`${servidor.prefix}athenas <argumento>\n${servidor.prefix}athenas add <pergunta>\n${servidor.prefix}athenas check <argumento>\`\`\``,
                  'color': 11676858,
                  'timestamp': new Date(),
                  'footer': {
                    'icon_url': message.author.displayAvatarURL,
                    'text': message.author.username
                  },
                  'thumbnail': {
                    'url': 'https://i.imgur.com/O6u2A36.png'
                  }
                }
              })
            }

            setTimeout(() => {
              wathenas.delete()
            }, 5000)
          }).catch(err => {
            message.reply('**:thinking: Não consegui criar um webhook, verifique se existem 10 webhooks ou se tenho permissão para criar.**\n:x: **Erro: **' + err)
          })
        } else {
          message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
        }
      })
    } else {
      message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
    }
  })
}
