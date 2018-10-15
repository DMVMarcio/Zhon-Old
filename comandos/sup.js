var database = require('../database.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  database.Users.findOne({
    '_id': message.author.id
  }, function (derro, developer) {
    if (developer) {
      if (developer.dev) {
        if (message.mentions.users.size < 1) {
          message.channel.sendMessage(':x: **Por favor, mencione o usuário.**')
        } else {
          database.Users.findOne({
            '_id': message.mentions.users.first().id
          }, function (erro, usuario) {
            if (usuario) {
              if (usuario.sup) {
                usuario.sup = false
                usuario.save()
                message.reply('**Usuário não é mais supervisor <:check:438534229563801620>**')
              } else {
                usuario.sup = true
                usuario.save()
                message.reply('**Usuário agora é supervisor <:check:438534229563801620>**')
              }
            } else {
              message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
            }
          })
        }
      } else {
        message.reply('**Sem permissão. <a:engrenagem:440261266934857728>**')
      }
    } else {
      message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
    }
  })
}
