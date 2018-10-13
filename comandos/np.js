var Discord = require('discord.js')
var musicas = require('../queue.js')
const moment = require('moment')
require('moment-duration-format')
moment.locale('pt-BR')

exports.run = ({ client, message, args, language }, t) => {

    if (musicas.queue.get(message.guild.id)) {
        var num = 1
        var encontrado = false
        var line = ['▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬']
        var time = parseInt(musicas.queue.get(message.guild.id).som.time[musicas.queue.get(message.guild.id).atual])
        var inicio = musicas.queue.get(message.guild.id).inicio
        var timeAtual = (new Date() - inicio)/1000
        var total = moment.duration.format([moment.duration((time*1000))], 'hh:mm:ss').toString()
        var atual = moment.duration.format([moment.duration((timeAtual*1000))], 'hh:mm:ss').toString()
        total = total.length === 2 ? `00:${total}` : total
        atual = atual.length === 2 ? `00:${atual}` : atual
        line.forEach(tline => {
            if(!encontrado) {
                if(timeAtual < time/100*(num*10) || num === 10) {
                    encontrado = true
                    line[num - 1] = ":white_circle:"
                } else {
                    num++
                }
            }
        })
        var embed = new Discord.RichEmbed()
            .setColor(11676858)
            .setTimestamp(new Date())
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .addField(t('comandos:np.playingNow'), musicas.queue.get(message.guild.id).som.titulo[musicas.queue.get(message.guild.id).atual],  false)
            .addField(t('comandos:np.duration'), `▶️ ${line.join('')} **${parseInt(timeAtual*100/time)}%** [${atual}/${total}]`, true)
            .addField(t('comandos:np.addedBy'), message.guild.members.get(musicas.queue.get(message.guild.id).som.por[musicas.queue.get(message.guild.id).atual]), true)
        message.channel.send(embed);
    } else {
        message.channel.send(t('comandos:np.noPlaying'));
    }

}