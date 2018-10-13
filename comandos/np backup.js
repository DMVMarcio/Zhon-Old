var musicas = require('../queue.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  if (!musicas.queue.get(message.guild.id)) {
    message.channel.send(':x: **Não há nenhuma música tocando.**')
  } else {
    message.channel.sendMessage({
      'embed': {
        'title': ':notes: Tocando Agora:',
        'description': `${musicas.queue.get(message.guild.id).som.titulo[musicas.queue.get(message.guild.id).atual]}\n\n:busts_in_silhouette: **Adicionada por:** ${message.guild.members.get(musicas.queue.get(message.guild.id).som.por[musicas.queue.get(message.guild.id).atual])}`,
        'color': 11676858,
        'timestamp': new Date(),
        'footer': {
          'icon_url': message.author.displayAvatarURL,
          'text': message.author.username
        }
      }
    })
  }
}
