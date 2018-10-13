var database = require('../database.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  let usuario = message.mentions.users.first() ? message.mentions.users.first() : message.author

  database.Users.findOne({
    '_id': usuario.id
  }, function (erro, documento) {
    if (documento) {
      let mensagem = message.mentions.users.first() ? t('comandos:level.yesMention', { level: documento.level }) : t('comandos:level.noMention', { level: documento.level })
      message.channel.sendMessage(mensagem)
    } else {
      message.channel.sendMessage(t('comandos:level.errorOccurred'))
    }
  })
}