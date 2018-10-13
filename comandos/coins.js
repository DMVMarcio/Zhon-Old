var database = require('../database.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  let usuario = message.mentions.users.first() ? message.mentions.users.first() : message.author

  database.Users.findOne({
    '_id': usuario.id
  }, function (erro, documento) {
    if (documento) {
      let mensagem = message.mentions.users.first() ? t('comandos:coins.yesMention', { coins: documento.coins }) : t('comandos:coins.noMention', { coins: documento.coins })
      message.channel.sendMessage(mensagem)
    } else {
      message.channel.sendMessage(t('comandos:level.errorOccurred'))
    }
  })
}