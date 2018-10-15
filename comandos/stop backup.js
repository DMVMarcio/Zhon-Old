var musicas = require('../queue.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  if (!musicas.queue.get(message.guild.id)) {
    message.channel.sendMessage(':x: **Não há nada tocando.**')
  } else {
    if (message.member.voiceChannel) {
      if (message.member.voiceChannel.id === message.guild.members.get(client.user.id).voiceChannel.id) {
        if (musicas.queue.get(message.guild.id).som.por[musicas.queue.get(message.guild.id).atual] === message.author.id || message.member.roles.find('name', 'DJ') || message.member.hasPermission(['MUTE_MEMBERS'])) {
          musicas.queue.get(message.guild.id).som.por = []
          musicas.queue.get(message.guild.id).som.id = []
          musicas.queue.get(message.guild.id).som.titulo = []
          musicas.queue.get(message.guild.id).connection.end()
          message.channel.sendMessage(':notes: **Todas as músicas foram paradas.**')
        } else {
          message.channel.sendMessage(':thinking: | **É necessário que você tenha o cargo `DJ` ou tenha adicionado a música.**')
        }
      } else {
        message.channel.sendMessage(':x: **Você não está no canal em que estou tocando.**')
      }
    } else {
      message.channel.sendMessage(':x: **Você não está em um canal de voz.**')
    }
  }
}
