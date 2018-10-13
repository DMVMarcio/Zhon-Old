var musicas = require('../queue.js')

var numero = 0
exports.run = ({ client, message, args, lang, language }, t) => {
  if (!musicas.queue.get(message.guild.id)) {
    message.channel.sendMessage(':x: **Não há nenhuma música tocando.**')
  } else {
    message.channel.sendMessage({
      'embed': {
        'title': ':notes: Playlist:',
        'description': `${musicas.queue.get(message.guild.id).som.titulo.map(musica => `**${++numero}** - **${musica}**, por: ${message.guild.members.get(musicas.queue.get(message.guild.id).som.por[numero - 1])}`).join('\n')}\n\n`,
        'color': 11676858,
        'timestamp': new Date(),
        'footer': {
          'icon_url': message.author.displayAvatarURL,
          'text': message.author.username
        },
        'fields': [
          {
            'name': ':headphones: Tocando agora:',
            'value': `${musicas.queue.get(message.guild.id).som.titulo[musicas.queue.get(message.guild.id).atual]}`,
            'inline': false
          },
          {
            'name': ':busts_in_silhouette: Adicionada por:',
            'value': `${message.guild.members.get(musicas.queue.get(message.guild.id).som.por[musicas.queue.get(message.guild.id).atual])}`,
            'inline': true
          },
          {
            'name': ':repeat_one: Repetir:',
            'value': `${(musicas.queue.get(message.guild.id).repetir === 'não' ? 'Não' : musicas.queue.get(message.guild.id).repetir === 'musica' ? 'Música' : 'Playlist')}`,
            'inline': true
          }
        ]
      }
    })
    numero = 0
  }
}
