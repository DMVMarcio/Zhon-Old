var database = require('../database.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  database.Users.findOne({
    '_id': message.author.id
  }, function (erro, usuario) {
    if (usuario) {
      if (usuario.owner || usuario.subowner || usuario.dev || usuario.sup || message.member.hasPermission(['MANAGE_GUILD'])) {
        database.Guilds.findOne({
          '_id': message.guild.id
        }, function (servro, servidor) {
          if (servidor) {
            var canal = message.mentions.channels.first() ? message.mentions.channels.first() : message.channel
            var desativar = !!servidor.blackchannels.includes(canal.id)
            if (desativar) {
              servidor.blackchannels.splice(servidor.blackchannels.indexOf(canal.id), 1)
            } else {
              servidor.blackchannels.unshift(canal.id)
            }
            servidor.save()
            message.channel.sendMessage(`:wink: Meus comandos ${!desativar ? '**não** serão mais' : '**agora** poderão ser'} **executados** no canal \`${canal.name}\``)
          } else {
            message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
          }
        })
      } else {
        message.reply('**Sem permissão. <a:engrenagem:440261266934857728>**')
      }
    } else {
      message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
    }
  })
}
