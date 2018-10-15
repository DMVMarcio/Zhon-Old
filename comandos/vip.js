exports.run = ({ client, message, args, language }, t) => {
  message.channel.sendMessage({
    'embed': {
      'title': ':gem: Vip Zhon:',
      'description': t('comandos:vip.description'),
      'color': 11676858,
      'timestamp': new Date(),
      'footer': {
        'icon_url': message.author.displayAvatarURL,
        'text': message.author.username
      },
      'thumbnail': {
        'url': 'https://i.imgur.com/0DEF4PI.png'
      }
    }
  })
}
