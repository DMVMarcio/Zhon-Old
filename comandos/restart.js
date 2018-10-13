var musicas = require('../queue.js')

exports.run = ({ client, message, args, language, prefixo }, t) => {

    if (musicas.queue.get(message.guild.id)) {
        if (message.member.voiceChannel) {
            if (message.member.voiceChannel.id === message.guild.members.get(client.user.id).voiceChannel.id) {
                if (musicas.queue.get(message.guild.id).som.por[musicas.queue.get(message.guild.id).atual] === message.author.id || message.member.roles.find('name', 'DJ') || message.member.hasPermission(['MOVE_MEMBERS'])) {
                    musicas.queue.get(message.guild.id).restart = true
                    musicas.queue.get(message.guild.id).connection.end()
                    setTimeout(() => {
                      musicas.queue.get(message.guild.id).restart = false
                    }, 1500)
                } else {
                    message.channel.send(t('comandos:restart.noPerm'));
                }
            } else {
                message.channel.send(t('comandos:restart.differentChannels', { prefix: prefixo }));
            }
        } else {
            message.channel.send(t('comandos:restart.noVoiceChannel'));
        }
    } else {
        message.channel.send(t('comandos:restart.noPlaying'));
    }

}