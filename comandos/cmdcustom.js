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
              if (message.content.startsWith(servidor.prefix + 'cmdcustom par')) {
                message.channel.sendMessage({
                  'embed': {
                    'title': '<a:engrenagem:440261266934857728> Parâmetros:',
                    'description': `\`\`\`\n{member} menciona o usuário\n{member.username} nome de usuário\n{member.id} id de usuário\n{users.size} quantidade de usuários no servidor\n{guild.name} nome do servidor\n{guild.id} id do servidor\`\`\``,
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
              } else if (message.content.startsWith(servidor.prefix + 'cmdcustom info')) {
                if (!razaod.length < 1) {
                  if (servidor.customcmd.includes(args[1])) {
                    let função = servidor.customfun[servidor.customcmd.indexOf(args[1])] === 'addrole' ? 'RECEBER CARGO' : servidor.customfun[servidor.customcmd.indexOf(args[1])] === 'response' ? 'RESPONDER' : 'NENHUMA'
                    let resultado = servidor.customfun[servidor.customcmd.indexOf(args[1])] === 'addrole' ? `**CARGO:** <@&${servidor.customresposta[servidor.customcmd.indexOf(args[1])]}>` : servidor.customfun[servidor.customcmd.indexOf(args[1])] === 'response' ? `**MENSAGEM:** ${servidor.customresposta[servidor.customcmd.indexOf(args[1])]}` : '**ERRO:** Não encontrado.'
                    message.channel.sendMessage({
                      'embed': {
                        'title': `:gear: ${servidor.customcmd[servidor.customcmd.indexOf(args[1])].toUpperCase()}`,
                        'description': `**Função:** \`${função}\`\n${resultado}`,
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
                    message.channel.sendMessage(':x: **Comando inexistente.**')
                  }
                } else {
                  message.channel.sendMessage({
                    'embed': {
                      'description': `**<a:engrenagem:440261266934857728> Comandos:**.\n${servidor.customcmd.length === 0 ? '`Nenhum comando setado.' : `\`${servidor.prefix}`}${servidor.customcmd.join(`\` **|** \`${servidor.prefix}`)}\``,
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
              } else if (message.content.startsWith(servidor.prefix + 'cmdcustom del')) {
                if (!razaod.length < 1) {
                  if (servidor.customcmd.includes(args[1])) {
                    servidor.customresposta.splice(servidor.customcmd.indexOf(args[1]), 1)
                    servidor.customfun.splice(servidor.customcmd.indexOf(args[1]), 1)
                    servidor.customcmd.splice(servidor.customcmd.indexOf(args[1]), 1)
                    servidor.save()
                    message.channel.sendMessage(`<:check:438534229563801620> **Comando \`${args[1]}\`removido neste servidor**`)
                  } else {
                    message.channel.sendMessage('**:x: Comando não encontrado.**')
                  }
                } else {
                  message.channel.sendMessage('**:x: Por favor, cite o comando que deseja deletar.**')
                }
              } else if (message.content.toLowerCase().startsWith(servidor.prefix + 'cmdcustom add')) {
                if (!razaod.length < 1) {
                  if (servidor.customcmd.includes(args[1].toLowerCase())) {
                    message.channel.sendMessage('**:x: Comando já existente.**')
                  } else {
                    message.channel.sendMessage(`:thinking: | **Qual será a função do comando \`${servidor.prefix}${args[1].toLowerCase()}\`, \`addrole\` ou \`response\`.**`)

                    message.channel.awaitMessages(mensagem => mensagem.author.id === message.author.id && mensagem.content === 'addrole' || mensagem.content === 'response', {

                      maxMatches: 1,
                      time: 20000,
                      errors: ['time']
                    }).then((coletado) => {
                      var comando
                      if (coletado.first().content === 'response') {
                        comando = 'response'
                        message.channel.sendMessage(`:thinking: | **Qual será a resposta?**`)
                        message.channel.awaitMessages(mensagem => mensagem.author.id === message.author.id, {
                          maxMatches: 1,
                          time: 20000,
                          errors: ['time']
                        }).then((resposta) => {
                          servidor.customcmd.unshift(args[1].toLowerCase())
                          servidor.customfun.unshift(comando)
                          servidor.customresposta.unshift(resposta.first().content)
                          servidor.save()

                          message.channel.sendMessage(`:cocktail: **Novo comando adicionado:**\n**Comando:** \`${args[1].toLowerCase()}\`\n**Função:** ${comando}\n**Resposta:** ${resposta.first().content}`)
                        }, function (err) {
                          message.channel.sendMessage('**:x: Seu tempo esgotou.**')
                        })
                      } else if (coletado.first().content === 'addrole') {
                        comando = 'addrole'
                        message.channel.sendMessage(`:thinking: | **Agora mencione o cargo que será recebido.**`)

                        message.channel.awaitMessages(mensagem => mensagem.author.id === message.author.id && mensagem.mentions.roles.first(), {
                          maxMatches: 1,
                          time: 20000,
                          errors: ['time']
                        }).then((resposta) => {
                          servidor.customcmd.unshift(args[1].toLowerCase())
                          servidor.customfun.unshift(comando)
                          servidor.customresposta.unshift(resposta.first().mentions.roles.first().id)
                          servidor.save()
                          message.channel.sendMessage(`:cocktail: **Novo comando adicionado:**\n**Comando:** \`${args[1].toLowerCase()}\`\n**Função:** ${comando}\n**Cargo:** ${resposta.first().mentions.roles.first().name}`)
                        }, function () {
                          message.channel.sendMessage('**:x: Seu tempo esgotou.**')
                        })
                      }
                    }, function () {
                      message.channel.sendMessage('**:x: Seu tempo esgotou.**')
                    })
                  }
                } else {
                  message.channel.sendMessage('**:x: Cite o nome do comando.**')
                }
              }
            } else {
              message.channel.sendMessage({
                'embed': {
                  'title': '<a:engrenagem:440261266934857728> Custom Commands:',
                  'description': `\`\`\`\n${servidor.prefix}cmdcustom add <comando>\n${servidor.prefix}cmdcustom del <comando>\n${servidor.prefix}cmdcustom info\n${servidor.prefix}cmdcustom par\`\`\``,
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
