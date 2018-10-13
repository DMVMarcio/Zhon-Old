var figlet = require('figlet')

exports.run = ({ client, message, args, language }, t) => {
  let razaou = args.slice(0).join(' ')

  if (!razaou.length < 1) {
    var texto = args.join(' ')

    if (texto.length <= 15) {
      figlet(texto, function (err, resultado) {
        if (err) throw err
        message.channel.sendMessage(t('comandos:ascii.asciiText', { member: message.author.username, result: resultado }))
      })
    } else {
      message.channel.sendMessage(t('comandos:ascii.characterLimit'))
    }
  } else {
    message.channel.sendMessage(t('comandos:ascii.noArgs'))
  }
}
