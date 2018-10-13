const request = require('request')
var random = Math.random() * 25

exports.run = ({ client, message, args, language }, t) => {
  if (message.mentions.users.size > 0) {
    if (message.mentions.users.first().id !== message.author.id) {
      request(`https://api.tenor.com/v1/search?q=anime%20hug&key=${process.env.tenor}&limit=30&anon_id=3a76e56901d740da9e59ffb22b988242`, {
        json: true
      }, (err, res, body) => {
        if (err) {
          return console.log(err)
        }
        message.channel.sendMessage({
          'embed': {
            'title': t('comandos:hug.hug', { author: message.author.username, member: message.mentions.users.first().username }),
            'color': 11676858,
            'timestamp': new Date(),
            'footer': {
              'icon_url': message.author.displayAvatarURL,
              'text': message.author.username
            },
            'image': {
              'url': body['results'][parseInt(random)]['media'][0]['gif']['url']
            }
          }
        })
        
      })
    } else {
      message.channel.sendMessage(t('comandos:hug.youMention'))
    }
  } else {
    message.channel.sendMessage(t('comandos:hug.noMention'))
  }
}