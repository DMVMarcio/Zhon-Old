var database = require('../database.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  let razaou = args.slice(0).join(' ')

  if (!razaou.length < 1) {
    if (args.join(' ').length <= 183) {
      database.Users.findOne({
        '_id': message.author.id
      }, function (erro, usuario) {
        if (usuario) {
          usuario.sobre = args.join(' ')
          usuario.save()
          message.channel.sendMessage(t('comandos:sobremim.changedSuccessfullyTo', {sobre: args.join(' ')}))
        } else {
          message.channel.sendMessage(t('comandos:sobremim.errorOccurred'))
        }
      })
    } else {
      message.channel.sendMessage(t('comandos:sobremim.characterLimit'))
    }
  } else {
    message.channel.sendMessage(t('comandos:sobremim.noArgs'))
  }
}
