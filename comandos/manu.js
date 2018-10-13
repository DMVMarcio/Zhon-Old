var database = require('../database.js')

exports.run = ({ client, message, args, language, usuario }, t) => {
  let razaou = args.slice(0).join(' ')

      if (usuario.owner || usuario.subowner || usuario.dev) {
        if (!razaou.length < 1) {
          database.Comandos.findOne({
            '_id': args[0].toLowerCase()
          }, function (cerro, comando) {
            if (comando) {
              if (comando.manutenção) {
                comando.manutenção = false
                comando.save()
                message.channel.send(t('comandos:manu.exit', { comando: comando._id }));
              } else {
                comando.manutenção = true
                comando.save()
                message.channel.send(t('comandos:manu.enter', { comando: comando._id }));
              }
            } else {
              message.channel.send(t('comandos:manu.invalidCommand'))
            }
          })
        } else {
          message.channel.send(t('comandos:manu.noArgs'))
        }
      } else {
        message.reply(t('comandos:manu.noPerm'))
      }
}