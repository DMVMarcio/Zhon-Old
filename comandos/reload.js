var database = require('../database.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  let reason = args.slice(0).join(' ')

  database.Users.findOne({
    '_id': message.author.id
  }, function (erro, usuario) {
    if (usuario) {
      if (usuario.owner || usuario.subowner || usuario.dev || usuario.sup) {
        if (reason.length < 1) return message.reply('**Diga o comando que devo reiniciar!**')

        delete require.cache[require.resolve(`./${args[0]}.js`)]

        message.channel.sendMessage('<a:relo:442892992215252992> **Comando reiniciado:** ' + args[0])
      } else {
        message.reply('**Sem permissão. <a:engrenagem:440261266934857728>**')
      }
    } else {
      message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
    }
  })
}
