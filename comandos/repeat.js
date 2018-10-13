var musicas = require('../queue.js')

exports.run = ({ client, message, args, language, prefixo }, t) => {

    if (musicas.queue.get(message.guild.id)) {
        if (message.member.voiceChannel) {
            if (message.member.voiceChannel.id === message.guild.members.get(client.user.id).voiceChannel.id) {
                if (musicas.queue.get(message.guild.id).som.por[musicas.queue.get(message.guild.id).atual] === message.author.id || message.member.roles.find('name', 'DJ') || message.member.hasPermission(['MOVE_MEMBERS'])) {
                    let razaou = args.slice(0).join(' ')
                    var modes = {
                        "off": 0,
                        "song": 1,
                        "queue": 2
                    }
                    var modesA = ["off", "song", "queue"]
                    if (!razaou.length < 1) {
                        if(modesA.includes(args[0].toLowerCase())) {
                            if(musicas.queue.get(message.guild.id).repetir !== modes[args[0].toLowerCase()]) {
                                musicas.queue.get(message.guild.id).repetir = modes[args[0].toLowerCase()]
                                message.channel.send(t('comandos:repeat.definedMode', { mode: args[0].toLowerCase() }));
                            } else {
                                message.channel.send(t('comandos:repeat.alreadyDefined'));
                            }
                        } else {
                            message.channel.send(t('comandos:repeat.invalidArgs', { options: modesA.join("` **|** `") }));
                        }
                    } else {
                        message.channel.send(t('comandos:repeat.noArgs', { options: modesA.join("` **|** `") }));
                    }
                } else {
                    message.channel.send(t('comandos:repeat.noPerm'));
                }
            } else {
                message.channel.send(t('comandos:repeat.differentChannels', { prefix: prefixo }));
            }
        } else {
            message.channel.send(t('comandos:repeat.noVoiceChannel'));
        }
    } else {
        message.channel.send(t('comandos:repeat.noPlaying'));
    }

}