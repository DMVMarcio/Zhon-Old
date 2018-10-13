const gifSearch = require('gif-search')

exports.run = ({ client, message, args, lang, language }, t) => {
  gifSearch.random('cat').then(
    gifUrl => message.channel.sendMessage({
      'embed': {
        'title': t('comandos:cat.cat'),
        'color': 11676858,
        'timestamp': new Date(),
        'footer': {
          'icon_url': message.author.displayAvatarURL,
          'text': message.author.username
        },
        'image': {
          'url': gifUrl
        }
      }
    })
  )
}
