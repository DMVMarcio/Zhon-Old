var musicas = require('../queue.js')

exports.run = ({ client, message, args, language, prefixo }, t) => {

    if (musicas.queue.get(message.guild.id)) {
        if (message.member.voiceChannel) {
            if (message.member.voiceChannel.id === message.guild.members.get(client.user.id).voiceChannel.id) {
                if (musicas.queue.get(message.guild.id).som.por[musicas.queue.get(message.guild.id).atual] === message.author.id || message.member.roles.find('name', 'DJ') || message.member.hasPermission(['MUTE_MEMBERS'])) {
                    musicas.queue.get(message.guild.id).som.por = []
                    musicas.queue.get(message.guild.id).som.id = []
                    musicas.queue.get(message.guild.id).som.titulo = []
                    musicas.queue.get(message.guild.id).som.time = []
                    musicas.queue.get(message.guild.id).repetir = 0
                    musicas.queue.get(message.guild.id).connection.end()
                } else {
                    message.channel.send(t('comandos:stop.noPerm'));
                }
            } else {
                message.channel.send(t('comandos:stop.differentChannels', { prefix: prefixo }));
            }
        } else {
            message.channel.send(t('comandos:stop.noVoiceChannel'));
        }
    } else {
        message.channel.send(t('comandos:stop.noPlaying'));
    }

}