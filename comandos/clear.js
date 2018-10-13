var database = require('../database.js')

exports.run = ({ client, message, args, Language }, t) => {
  let razaou = args.slice(0).join(' ')

  database.Users.findOne({
    '_id': message.author.id
  }, function (erro, usuario) {
    if (usuario) {
      if (usuario.owner || usuario.subowner || usuario.dev || usuario.sup || message.member.hasPermission(['MANAGE_MESSAGES'])) {
        if (!razaou.length < 1) {
          var quantidade
          if (parseInt(args[0]) >= 101 || parseInt(args[0]) <= 0) {
            quantidade = 100
          } else {
            quantidade = parseInt(args[0])
          }
          message.delete()
          setTimeout(() => {
            message.channel.bulkDelete(quantidade)
          }, 400)
          setTimeout(function () {
            message.channel.sendMessage(t('comandos:clear.clear', { user: message.author.id, quantidade: quantidade })).then((value) => {
              setTimeout(() => {
                value.delete()
              }, 5000)
            })
          }, 2000)
        } else {
          message.channel.sendMessage(t('comandos:clear.noArgs'))
        }
      } else {
        message.channel.sendMessage(t('comandos:clear.noPerm'))
      }
    } else {
      message.channel.sendMessage(t('comandos:clear.errorOccurred'))
    }
  })
}
