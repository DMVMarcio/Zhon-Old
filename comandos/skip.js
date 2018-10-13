var musicas = require('../queue.js')

exports.run = ({ client, message, args, language, prefixo }, t) => {

    if (musicas.queue.get(message.guild.id)) {
        if (message.member.voiceChannel) {
            if (message.member.voiceChannel.id === message.guild.members.get(client.user.id).voiceChannel.id) {
                if (musicas.queue.get(message.guild.id).som.por[musicas.queue.get(message.guild.id).atual] === message.author.id || message.member.roles.find('name', 'DJ') || message.member.hasPermission(['MOVE_MEMBERS'])) {
                    if (musicas.queue.get(message.guild.id).som.titulo.length > 1) {
                        if(musicas.queue.get(message.guild.id).repetir === 1) {
                            musicas.queue.get(message.guild.id).som.por.splice(musicas.queue.get(message.guild.id).atual, 1)
                            musicas.queue.get(message.guild.id).som.id.splice(musicas.queue.get(message.guild.id).atual, 1)
                            musicas.queue.get(message.guild.id).som.titulo.splice(musicas.queue.get(message.guild.id).atual, 1)
                        }
                        message.channel.send(t('comandos:skip.jumped'));
                        musicas.queue.get(message.guild.id).connection.end()
                    } else {
                        message.channel.send(t('comandos:skip.noSong'));
                    }
                } else {
                    message.channel.send(t('comandos:skip.noPerm'));
                }
            } else {
                message.channel.send(t('comandos:skip.differentChannels', { prefix: prefixo }));
            }
        } else {
            message.channel.send(t('comandos:skip.noVoiceChannel'));
        }
    } else {
        message.channel.send(t('comandos:skip.noPlaying'));
    }

}