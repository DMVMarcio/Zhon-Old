var database = require('../database.js')

exports.run = ({ client, message, args, language }, t) => {
  database.Users.findOne({
    '_id': message.author.id
  }, function (erro, usuario) {
    if (usuario) {
      if (usuario.owner || usuario.subowner || usuario.dev || usuario.sup || message.member.hasPermission(['MANAGE_GUILD'])) {
        database.Guilds.findOne({
          '_id': message.guild.id
        }, function (servro, servidor) {
          if (servidor) {
            if (servidor.logs) {
              servidor.logs = false
              servidor.logschannel = 'Nenhum'
              servidor.save()
              message.channel.sendMessage(t('comandos:logs.logsOff'))
            } else {
              servidor.logs = true
              servidor.logschannel = message.channel.id
              servidor.save()
              message.channel.sendMessage(t('comandos:logs.logsOn'))
            }
          } else {
            message.channel.sendMessage(t('comandos:logs.errorOccurred'))
          }
        })
      } else {
        message.channel.sendMessage(t('comandos:logs.noPerm'))
      }
    } else {
      message.channel.sendMessage(t('comandos:logs.errorOccurred'))
    }
  })
}
