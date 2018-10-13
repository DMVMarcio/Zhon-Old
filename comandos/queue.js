var Discord = require('discord.js')
var musicas = require('../queue.js')
const moment = require('moment')
require('moment-duration-format')
moment.locale('pt-BR')

exports.run = ({ client, message, args, language }, t) => {

    if (musicas.queue.get(message.guild.id)) {
        var modes = ["off", "song", "queue"]
        var num = 0
        var pagina = 1
        var totalPages = parseInt(musicas.queue.get(message.guild.id).som.id.length/10+1)
        var embed = new Discord.RichEmbed()
            .setColor(11676858)
            .setTimestamp(new Date())
            .setFooter(`Page ${pagina} of ${totalPages}`, message.author.displayAvatarURL)
            .addField(`<:notesZhon:491449388636569622> Playlist:`, `${musicas.queue.get(message.guild.id).som.titulo.map(musica => `**${++num}** - **${musica}**, por: ${message.guild.members.get(musicas.queue.get(message.guild.id).som.por[num - 1])}`).slice(0,10).join('\n')}\n\n`, false)
            .addField(t('comandos:queue.playingNow'), musicas.queue.get(message.guild.id).som.titulo[musicas.queue.get(message.guild.id).atual], false)
            .addField(t('comandos:queue.addedBy'), message.guild.members.get(musicas.queue.get(message.guild.id).som.por[musicas.queue.get(message.guild.id).atual]), true)
            .addField(t('comandos:queue.repeat'), modes[musicas.queue.get(message.guild.id).repetir], true)
        message.channel.send(embed).then(async filaMSG => {
            if(musicas.queue.get(message.guild.id).som.id.length > 10) {
                await filaMSG.react("⬅");
                await filaMSG.react("➡");

                const voltar = filaMSG.createReactionCollector((r, u) => r.emoji.name === "⬅" && u.id === message.author.id, { time: 100000 });
                const proximo = filaMSG.createReactionCollector((r, u) => r.emoji.name === "➡" && u.id === message.author.id, { time: 100000 });

                voltar.on("collect", async r => {
                    if(pagina !== 1) {
                        num = num-10
                        num = num.toString().length > 1 ? num-parseInt(num.toString().slice(num.toString().length-1)) : 0
                        pagina -= 1
                        embed.fields[0].value = `${musicas.queue.get(message.guild.id).som.titulo.map(musica => `**${++num}** - **${musica}**, por: ${message.guild.members.get(musicas.queue.get(message.guild.id).som.por[num - 1])}`).slice(pagina*10-10,pagina*10).join('\n')}\n\n`
                        embed.setFooter(`Page ${pagina} of ${totalPages}`, message.author.displayAvatarURL)
                        filaMSG.edit(embed);
                        r.remove(r.users.last().id)
                    } else {
                        pagina = totalPages
                        num = totalPages*10-20
                        embed.fields[0].value = `${musicas.queue.get(message.guild.id).som.titulo.map(musica => `**${++num}** - **${musica}**, por: ${message.guild.members.get(musicas.queue.get(message.guild.id).som.por[num - 1])}`).slice(totalPages*10-10,pagina*10).join('\n')}\n\n`
                        embed.setFooter(`Page ${pagina} of ${totalPages}`, message.author.displayAvatarURL)
                        filaMSG.edit(embed);
                        r.remove(r.users.last().id)
                    }
                })

                proximo.on("collect", async r => {
                    if(pagina !== totalPages) {
                        num = num.toString().length > 1 ? num-parseInt(num.toString().slice(num.toString().length-1)) : 0
                        num = num-10
                        pagina += 1
                        embed.fields[0].value = `${musicas.queue.get(message.guild.id).som.titulo.map(musica => `**${++num}** - **${musica}**, por: ${message.guild.members.get(musicas.queue.get(message.guild.id).som.por[num - 1])}`).slice(pagina*10-10,pagina*10).join('\n')}\n\n`
                        embed.setFooter(`Page ${pagina} of ${totalPages}`, message.author.displayAvatarURL)
                        filaMSG.edit(embed);
                        r.remove(r.users.last().id)
                    } else {
                        pagina = 1
                        num = 0
                        embed.fields[0].value = `${musicas.queue.get(message.guild.id).som.titulo.map(musica => `**${++num}** - **${musica}**, por: ${message.guild.members.get(musicas.queue.get(message.guild.id).som.por[num - 1])}`).slice(0,pagina*10).join('\n')}\n\n`
                        embed.setFooter(`Page ${pagina} of ${totalPages}`, message.author.displayAvatarURL)
                        filaMSG.edit(embed);
                        r.remove(r.users.last().id)
                    }
                })

                voltar.on("end", async r => {
                    if(r.size >= 1) return;
                    filaMSG.delete();
                })   

            }
        })
    } else {
        message.channel.send(t('comandos:queue.noPlaying'));
    }
}