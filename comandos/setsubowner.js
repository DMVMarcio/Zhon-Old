var database = require('../database.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  if (message.author.id === '337410863545843714') {
    if (message.mentions.users.size < 1) {
      message.channel.sendMessage(':x: **Por favor, mencione o usuário.**')
    } else {
      database.Users.findOne({
        '_id': message.mentions.users.first().id
      }, function (erro, usuario) {
        if (usuario) {
          if (usuario.subowner) {
            usuario.subowner = false
            usuario.save()
            message.reply('**Usuário não é mais sub-dono <:check:438534229563801620>**')
          } else {
            usuario.subowner = true
            usuario.save()
            message.reply('**Usuário agora é sub-dono <:check:438534229563801620>**')
          }
        } else {
          message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
        }
      })
    }
  } else {
    message.reply('**Sem permissão. <a:engrenagem:440261266934857728>**')
  }
}
