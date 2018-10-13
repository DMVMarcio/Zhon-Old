var arquivo = require('../queue.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  if (!arquivo.queue.get(message.guild.id)) {
    message.channel.sendMessage(':x: **Não há nada tocando.**')
  } else {
    if (message.member.voiceChannel) {
      if (message.member.voiceChannel.id === message.guild.members.get(client.user.id).voiceChannel.id) {
        if (arquivo.queue.get(message.guild.id).som.por[arquivo.queue.get(message.guild.id).atual] === message.author.id || message.member.roles.find('name', 'DJ') || message.member.hasPermission(['MOVE_MEMBERS'])) {
          if (arquivo.queue.get(message.guild.id).som.titulo.length > 1) {
            message.channel.sendMessage(':track_next: **Música pulada.**')
            arquivo.queue.get(message.guild.id).connection.end()
          } else {
            message.channel.sendMessage('**:x: Não há mais músicas na playlist.**')
          }
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
