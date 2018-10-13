var database = require('../database.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  database.Users.findOne({
    '_id': message.author.id
  }, function (derro, developer) {
    if (developer) {
      if (developer.owner || developer.subowner) {
        if (message.mentions.users.size < 1) {
          message.channel.sendMessage(':x: **Por favor, mencione o usuário.**')
        } else {
          database.Users.findOne({
            '_id': message.mentions.users.first().id
          }, function (erro, usuario) {
            if (usuario) {
              if (usuario.dzn) {
                usuario.dzn = false
                usuario.save()
                message.reply('**Usuário não é mais designer <:check:438534229563801620>**')
              } else {
                usuario.dzn = true
                usuario.timevip = Date.now()
                usuario.save()
                message.reply('**Usuário agora é designer <:check:438534229563801620>**')
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
