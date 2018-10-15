const translate = require('google-translate-api')

exports.run = ({ client, message, args, lang, language }, t) => {
  let razaou = args.slice(0).join(' ')
  let razaod = args.slice(1).join(' ')

  if (!razaou.length < 1) {
    if (!razaod.length < 1) {
      translate(`${args.slice(1).join(' ')}`, {to: args[0]}).then(res => {
        message.channel.sendMessage({
          'embed': {
            'color': 11676858,
            'timestamp': new Date(),
            'footer': {
              'icon_url': message.author.displayAvatarURL,
              'text': message.author.username
            },
            'thumbnail': {
              'url': 'https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png'
            },
            'fields': [
              {
                'name': t('comandos:traduzir.before'),
                'value': `\`\`\`${args.slice(1).join(' ')}\`\`\``,
                'inline': false
              },
              {
                'name': t('comandos:traduzir.after'),
                'value': `\`\`\`${res.text}\`\`\``,
                'inline': false
              }
            ]
          }
        })
      }).catch(a => {
        console.error(a)
        message.channel.sendMessage(t('comandos:traduzir.invalidLang'))
      })
    } else {
      message.channel.sendMessage(t('comandos:traduzir.noArgsText'))
    }
  } else {
    message.channel.sendMessage(t('comandos:traduzir.noArgsLang'))
  }
}
