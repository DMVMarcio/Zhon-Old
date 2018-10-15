var musicas = require('../queue.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  if (!musicas.queue.get(message.guild.id)) {
    if (message.guild.members.get(client.user.id).voiceChannel) {
      if (message.member.voiceChannel.id !== message.guild.members.get(client.user.id).voiceChannel.id) {
        message.member.voiceChannel.join().then(function (canal) {
          message.channel.sendMessage(`:notes: **Me conectei ao canal de voz:** ${message.member.voiceChannel.name}`)
        }).catch(err => {
          message.reply('**:thinking: Não consegui me conectar. Verifique se posso me conectar ou se o canal está lotado.**')
        })
      } else {
        message.channel.sendMessage(':x: **Você está no mesmo canal em que estou conectado.**')
      }
    } else {
      message.member.voiceChannel.join().then(function (canal) {
        message.channel.sendMessage(`:notes: **Me conectei ao canal de voz:** ${message.member.voiceChannel.name}`)
      }).catch(err => {
        message.reply('**:thinking: Não consegui me conectar. Verifique se posso me conectar ou se o canal está lotado.**')
      })
    }
  } else {
    if (message.member.voiceChannel) {
      if (message.member.voiceChannel.id !== message.guild.members.get(client.user.id).voiceChannel.id) {
        if (musicas.queue.get(message.guild.id).som.por[musicas.queue.get(message.guild.id).atual] === message.author.id || message.member.roles.find('name', 'DJ') || message.member.hasPermission(['MOVE_MEMBERS'])) {
          message.member.voiceChannel.join().then(function (canal) {
            message.channel.sendMessage(`:notes: **Me conectei ao canal de voz:** ${message.member.voiceChannel.name}`)
          }).catch(err => {
            message.reply('**:thinking: Não consegui me conectar. Verifique se posso me conectar ou se o canal está lotado.**')
          })
        } else {
          message.channel.sendMessage(':thinking: | **É necessário que você tenha o cargo `DJ` ou tenha adicionado a música.**')
        }
      } else {
        message.channel.sendMessage(':x: **Você está no mesmo canal em que estou tocando.**')
      }
    } else {
      message.channel.sendMessage(':x: **Você não está em um canal de voz.**')
    }
  }
}
