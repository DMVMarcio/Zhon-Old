const gifSearch = require('gif-search')

exports.run = ({ client, message, args, language }, t)=> {

        gifSearch.random('dog').then(
            gifUrl => message.channel.sendMessage({
                  'embed': {
                        'title': t('comandos:dog.dog'),
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