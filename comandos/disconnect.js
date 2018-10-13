var musicas = require('../queue.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  if (message.guild.members.get(client.user.id).voiceChannel) {
    if (message.member.voiceChannel.id === message.guild.members.get(client.user.id).voiceChannel.id) {
      if (message.member.roles.find('name', 'DJ') || message.member.hasPermission(['MOVE_MEMBERS'])) {
        if (!musicas.queue.get(message.guild.id)) {
          message.member.voiceChannel.leave()
          message.channel.sendMessage(':notes: **Acabo de ser desconectado do canal de voz.**')
        } else {
          musicas.queue.get(message.guild.id).som.por = []
          musicas.queue.get(message.guild.id).som.atividade = []
          musicas.queue.get(message.guild.id).som.id = []
          musicas.queue.get(message.guild.id).som.titulo = []
          musicas.queue.get(message.guild.id).connection.end()
          message.channel.sendMessage(':notes: **Acabo de ser desconectado do canal de voz.**')
        }
      } else {
        message.channel.sendMessage(':thinking: | **É necessário que você tenha o cargo `DJ` ou à permissão de `MOVER MEMBROS`.**')
      }
    } else {
      message.channel.sendMessage(':x: **Você não está no mesmo canal em que estou conectado.**')
    }
  } else {
    message.channel.sendMessage(':x: **Não estou conectado a nenhum canal de voz.**')
  }
}
