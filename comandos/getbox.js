var database = require('../database.js')

exports.run = ({ client, message, args, language }, t) => {
  database.Users.findOne({
    '_id': message.author.id
  }, function (erro, usuario) {
    if (usuario) {
      database.Guilds.findOne({
        '_id': message.guild.id
      }, function (servro, servidor) {
        if (servidor) {
          if (servidor.caixa) {
            var caixaTP = servidor.caixatipo.toLowerCase()
            caixaTP = caixaTP.replace("comum", t('comandos:getbox.common')).replace("rara", t('comandos:getbox.rare')).replace("epica", t('comandos:getbox.epic')).replace("lendaria", t('comandos:getbox.legendary'))

            usuario.caixas.unshift(servidor.caixatipo.toLowerCase())
            usuario.save()
            servidor.caixa = false
            servidor.caixatipo = 'Comum'
            servidor.save()
            message.channel.send(t('comandos:getbox.get', { member: message.author, caixa: caixaTP }))
          } else {
            message.channel.sendMessage(t('comandos:getbox.noBox'))
          }
        } else {
          message.channel.sendMessage(t('comandos:getbox.errorOccurred'))
        }
      })
    } else {
      message.channel.sendMessage(t('comandos:getbox.errorOccurred'))
    }
  })
}
