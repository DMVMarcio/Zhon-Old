var coldown = new Set()
var usuario1 = []
var usuario2 = []
var database = require('../database.js')

exports.run = ({ client, message, args, language }, t) => {
  let razaod = args.slice(1).join(' ')
  let apostador = message.author.id
  let apostador2
  var quantidade
  var vencedor
  var perdedor
  var random = Math.round(Math.random() * 1)

  if (message.mentions.users.size > 0) {
    apostador2 = message.mentions.users.first().id

    if (!usuario1.includes(apostador + message.channel.id)) {
      if (!usuario2.includes(apostador + message.channel.id)) {
        if (!usuario2.includes(apostador2 + message.channel.id)) {
          if (!coldown.has(message.author.id)) {
            database.Users.findOne({
              '_id': apostador
            }, function (arro, apostou) {
              if (apostou) {
                database.Users.findOne({
                  '_id': apostador2
                }, function (rrro, recebeu) {
                  if (recebeu) {
                    if (!razaod.length < 1) {
                      quantidade = parseInt(args[1])

                      if (parseInt(args[1]) >= 1) {
                        if (apostou.coins >= quantidade && recebeu.coins >= quantidade) {
                          coldown.add(message.author.id)
                          setTimeout(function () {
                            coldown.delete(message.author.id)
                          }, 60 * 1000)

                          usuario1.unshift(apostador + message.channel.id)
                          usuario2.unshift(apostador2 + message.channel.id)

                          setTimeout(function () {
                            usuario1.splice(usuario1.indexOf(apostador + message.channel.id), 1)
                            usuario2.splice(usuario2.indexOf(apostador2 + message.channel.id), 1)
                          }, 20 * 1000)

                          message.channel.sendMessage(t('comandos:apostar.receivedOrder', { apostador: apostador, apostador2: apostador2, coins: Number(quantidade).toLocaleString() }));
                          message.channel.awaitMessages(mensagem => mensagem.author.id === apostador2 && (mensagem.content === t('comandos:apostar.accept') || mensagem.content === t('comandos:apostar.decline')), {
                            maxMatches: 1,
                            time: 20000,
                            errors: ['time']
                          }).then((coletado) => {
                            var resposta = coletado.first().content

                            if (resposta === t('comandos:apostar.decline')) {
                              usuario1.splice(usuario1.indexOf(apostador + message.channel.id), 1)
                              usuario2.splice(usuario2.indexOf(apostador2 + message.channel.id), 1)
                              message.channel.sendMessage(t('comandos:apostar.betDeclined'))
                            } else if (resposta === t('comandos:apostar.accept')) {
                              vencedor = random === 1 ? apostou : recebeu
                              perdedor = random === 0 ? apostou : recebeu
                              vencedor.coins += (quantidade)
                              vencedor.save()
                              perdedor.coins -= (quantidade)
                              perdedor.save()
                              message.channel.sendMessage(t('comandos:apostar.betFinish', { vencedor: vencedor._id, coins: (Number(quantidade).toLocaleString()) }));
                              usuario1.splice(usuario1.indexOf(apostador + message.channel.id), 1)
                              usuario2.splice(usuario2.indexOf(apostador2 + message.channel.id), 1)
                            }
                          }, function () {
                            usuario1.splice(usuario1.indexOf(apostador + message.channel.id), 1)
                            usuario2.splice(usuario2.indexOf(apostador2 + message.channel.id), 1)
                            message.channel.sendMessage(t('comandos:apostar.timeout'))
                          })
                        } else {
                          message.channel.sendMessage(t('comandos:apostar.insufficientMoney'))
                        }
                      } else {
                        message.channel.sendMessage(t('comandos:apostar.underZero'))
                      }
                    } else {
                      message.channel.sendMessage(t('comandos:apostar.noArgs'))
                    }
                  } else {
                    message.channel.sendMessage(t('comandos:apostar.errorOccurred'))
                  }
                })
              } else {
                message.channel.sendMessage(t('comandos:apostar.errorOccurred'))
              }
            })
          } else {
            message.channel.sendMessage(t('comandos:apostar.cooldown'))
          }
        } else {
          message.channel.sendMessage(t('comandos:apostar.memberAlreadyRequested'))
        }
      } else {
        message.channel.sendMessage(t('comandos:apostar.requestAlreadyReceived'))
      }
    } else {
      message.channel.sendMessage(t('comandos:apostar.youAlreadyRequested'))
    }
  } else {
    message.channel.sendMessage(t('comandos:apostar.noMention'))
  }
}
