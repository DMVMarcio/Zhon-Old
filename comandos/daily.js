var database = require('../database.js')
const moment = require('moment')
require('moment-duration-format')
moment.locale('pt-BR')

exports.run = ({ client, message, args, language }, t) => {
  database.Users.findOne({
    '_id': message.author.id
  }, function (erro, documento) {
    if (documento) {
      let valor = documento.owner || documento.subowner ? 1200 : documento.dev ? 1000 : documento.sup ? 800 : documento.dzn ? 600 : documento.vip ? 400 : 200
      var tempo = moment.duration.format([moment.duration((parseInt(documento.timedaily) + 86400000) - Date.now())], 'hh:mm:ss')

      if ((parseInt(documento.timedaily) + 86400000) <= (Date.now())) {
        documento.coins += valor
        documento.timedaily = Date.now()
        documento.save()
        message.channel.sendMessage(t('comandos:daily.collectedMoney', { valor: valor }))
      } else {
        message.channel.sendMessage(t('comandos:daily.alreadyGiven', { time: tempo }))
      }
    } else {
      message.channel.sendMessage(t('comandos:daily.errorOccurred'))
    }
  })
}
