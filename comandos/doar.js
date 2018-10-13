var database = require('../database.js')

exports.run = ({ client, message, args, language }, t) => {
  let razaod = args.slice(1).join(' ')
  var quantidade

  if (message.mentions.users.size > 0) {
    if (message.mentions.users.first().id !== message.author.id) {
      database.Users.findOne({
        '_id': message.author.id
      }, function (erro, documento) {
        if (documento) {
          database.Users.findOne({
            '_id': message.mentions.users.first().id
          }, function (err, receber) {
            if (err) throw err
            if (receber) {
              if (!razaod.length < 1) {
                quantidade = parseInt(args[1])

                if (quantidade > 0) {
                  if (documento.coins >= quantidade) {
                    documento.coins -= quantidade
                    documento.save()
                    receber.coins += quantidade
                    receber.save()
                    message.channel.sendMessage(t('comandos:doar.givenMoney', { coins: Number(quantidade).toLocaleString(), member: message.mentions.users.first().username }));
                  } else {
                    message.channel.sendMessage(t('comandos:doar.insufficientMoney'))
                  }
                } else {
                  message.channel.sendMessage(t('comandos:doar.underZero'))
                }
              } else {
                message.channel.sendMessage(t('comandos:doar.noArgs'))
              }
            } else {
              message.channel.sendMessage(t('comandos:doar.errorOccurred'))
            }
          })
        } else {
          message.channel.sendMessage(t('comandos:doar.errorOccurred'))
        }
      })
    } else {
      message.channel.sendMessage(':x: **Você não pode doar para você mesmo.**')
    }
  } else {
    message.channel.sendMessage(t('comandos:doar.noMention'))
  }
}
