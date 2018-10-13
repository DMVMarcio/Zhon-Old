var musicas = require('../queue.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  if (!musicas.queue.get(message.guild.id)) {
    message.channel.sendMessage(':x: **Não há nada tocando.**')
  } else {
    if (message.member.voiceChannel) {
      if (message.member.voiceChannel.id === message.guild.members.get(client.user.id).voiceChannel.id) {
        if (musicas.queue.get(message.guild.id).som.por[0] === message.author.id || message.member.roles.find('name', 'DJ') || message.member.hasPermission(['MOVE_MEMBERS'])) {
          let razaou = args.slice(0).join(' ')
          if (!razaou.length < 1) {
            if (args[0] === 'song') {
              if (musicas.queue.get(message.guild.id).repetir === 1) {
                message.channel.sendMessage('**:x: Este modo de repetição já está setado.**')
              } else {
                musicas.queue.get(message.guild.id).repetir = 1
                message.channel.sendMessage(`:notes: **Está música agora irá se repetir até essa função ser desativada.**`)
              }
            } else if (args[0] === 'queue') {
              if (musicas.queue.get(message.guild.id).repetir === 'fila') {
                message.channel.sendMessage('**:x: Este modo de repetição já está setado.**')
              } else {
                musicas.queue.get(message.guild.id).repetir = 'fila'
                message.channel.sendMessage(`:notes: **Está playlist agora irá se repetir até essa função ser desativada.**`)
              }
            } else if (args[0] === 'off') {
              if (musicas.queue.get(message.guild.id).repetir === 'não') {
                message.channel.sendMessage('**:x: A repetição já está desativada.**')
              } else {
                musicas.queue.get(message.guild.id).repetir = 'não'
                message.channel.sendMessage(`:notes: **Modo de repetição desativado.**`)
              }
            } else {
              message.channel.sendMessage(':x: **Argumento inválido.**')
            }
          } else {
            message.channel.sendMessage(':thinking: | **Por favor, cite uma dessas opções: `song`, `queue` ou `off`**')
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
