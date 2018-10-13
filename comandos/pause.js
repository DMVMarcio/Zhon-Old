var musicas = require('../queue.js')

exports.run = ({ client, message, args, language, prefixo }, t) => {

    if (musicas.queue.get(message.guild.id)) {
        if (message.member.voiceChannel) {
            if (message.member.voiceChannel.id === message.guild.members.get(client.user.id).voiceChannel.id) {
                if (musicas.queue.get(message.guild.id).som.por[musicas.queue.get(message.guild.id).atual] === message.author.id || message.member.roles.find('name', 'DJ') || message.member.hasPermission(['MOVE_MEMBERS'])) {
                    if (musicas.queue.get(message.guild.id).atividade !== 1) {
                        musicas.queue.get(message.guild.id).atividade = 1
                        musicas.queue.get(message.guild.id).connection.pause()
                        message.channel.send(t('comandos:pause.paused'));
                    } else {
                        message.channel.send(t('comandos:pause.alreadyPaused'));
                    }
                } else {
                    message.channel.send(t('comandos:pause.noPerm'));
                }
            } else {
                message.channel.send(t('comandos:pause.differentChannels', { prefix: prefixo }));
            }
        } else {
            message.channel.send(t('comandos:pause.noVoiceChannel'));
        }
    } else {
        message.channel.send(t('comandos:pause.noPlaying'));
    }

}