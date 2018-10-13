var Discord = require('discord.js')
var ytdl = require('ytdl-core')
var info = require('youtube-info')
var Api = require('simple-youtube-api')
var musicas = require('../queue.js')
var key = new Api(process.env.youtube)
var escolhendo = []
exports.run = ({ client, message, args, language, prefixo }, t) => {

    let razaou = args.slice(0).join(' ')
    var musicaID;
    var config;
    var playlist = false

    if (!escolhendo.includes(message.author.id + message.guild.id)) {
        if (message.member.voiceChannel) {
            if (!razaou.length < 1 && razaou !== '#') {
                if (args.length === 1 && args[0].startsWith('https://www.youtube.com/watch?v=')) {
                    musicaID = args[0].replace('https://www.youtube.com/watch?v=', '')
                    key.searchVideos(musicaID, 10).then(encontrados => {
                        if (encontrados.length > 0) {
                            tocar()
                        } else {
                            message.channel.send(t('comandos:play.invalidLink'))
                        }
                    })
                } else if (args.length === 1 && args[0].startsWith('https://www.youtube.com/playlist?list=')) {
                    playlist = true
                    tocar()
                } else {
                    key.searchVideos(razaou, 10).then((encontrados) => {
                        if (encontrados.length > 0) {
                            var numero = 0
                            var embedRS = new Discord.RichEmbed()
                                .setTitle(t('comandos:play.embedResults.title', { searchArgs: razaou }))
                                .setDescription(`${encontrados.map(musica => `**${++numero}** - ${musica.title}`).join('\n')}\n\n${t('comandos:play.embedResults.description')}`)
                                .setColor(11676858)
                                .setTimestamp(new Date())
                                .setFooter(message.author.username, message.author.displayAvatarURL)
                            message.channel.send(embedRS).then(msgRS => {

                                escolhendo.unshift(message.author.id + message.guild.id)
                                message.channel.awaitMessages(message1 => message1.content > 0 && message1.content <= 11 && message1.content <= encontrados.length && message1.author.id === message.author.id, {
                                    maxMatches: 1,
                                    time: 15000,
                                    errors: ['time']
                                }).then((coletado) => {
                                    musicaID = encontrados[Number(coletado.first().content) - 1].id
                                    escolhendo.splice(escolhendo.indexOf(message.author.id), 1)
                                    msgRS.delete()
                                    tocar()
                                }).catch(erro => {
                                    escolhendo.splice(escolhendo.indexOf(message.author.id + message.guild.id), 1)
                                    msgRS.delete()
                                    message.channel.send(t('comandos:play.timeout'));
                                })

                            })
                        } else {
                            message.channel.send(t('comandos:play.musicNotFound', { searchArgs: razaou }));
                        }
                    })
                }
            } else {
                message.channel.send(t('comandos:play.noArgs'));
            }
        } else {
            message.channel.send(t('comandos:play.noVoiceChannel'));
        }
    } else {
        message.channel.send(t('comandos:play.alreadyChoosing'));
    }

    async function tocar() {
        if (message.member.voiceChannel.permissionsFor(client.user.id).has('SPEAK') && message.member.voiceChannel.permissionsFor(client.user.id).has('CONNECT')) {
            if (!musicas.queue.get(message.guild.id)) {
                if (message.guild.me.voiceChannel) {
                    await message.guild.me.voiceChannel.leave()
                    ascP()
                } else {
                    ascP()
                }
                async function ascP() {
                    message.member.voiceChannel.join().then(canal => {
                        config = {
                            guild: message.guild.id,
                            channel: canal,
                            repetir: 0,
                            inicio: new Date(),
                            atual: 0,
                            canal: message.channel.id,
                            atividade: 0,
                            restart: false,
                            som: {
                                titulo: [],
                                time: [],
                                id: [],
                                por: []
                            },
                            connection: null
                        }
                        musicas.queue.set(message.guild.id, config)
                        tocar2()
                    }).catch(erro => {
                        message.channel.send(t('comandos:play.errorConnect'))
                    })
                }
            } else if (message.guild.me.voiceChannel) {
                if (message.guild.me.voiceChannel.id === message.member.voiceChannel.id) {
                    tocar2()
                } else {
                    message.channel.send(t('comandos:play.differentChannels', { prefix: prefixo }));
                }
            } else {
                musicas.queue.delete(message.guild.id)
            }
        } else {
            message.channel.send(t('comandos:play.noPerm'))
        }
    }

    async function tocar2() {
        if (!playlist) {
            if (!musicas.queue.get(message.guild.id).som.id[0]) {
                info(musicaID, (erro, music) => {
                    let tempo = Math.floor(music.duration)
                    let horas;
                    let minutos;
                    let minutos2;
                    let segundos;
                    if (tempo >= 3600) {
                        horas = Math.floor(tempo / 60 / 60)
                        minutos = Math.floor(tempo / 60)
                        minutos2 = Math.floor(tempo / 60 - horas * 60)
                        segundos = Math.floor(tempo - (minutos * 60))
                    } else {
                        horas = 0
                        minutos = Math.floor(tempo / 60)
                        minutos2 = Math.floor(tempo / 60)
                        segundos = Math.floor(tempo - (minutos * 60))
                    }
                    var embedPM = new Discord.RichEmbed()
                        .setTitle(`:tada: ${music.title}`)
                        .setColor(11676858)
                        .setTimestamp(new Date())
                        .setFooter(message.author.username, message.author.displayAvatarURL)
                        .setImage(music.thumbnailUrl)
                        .addField(t('comandos:play.embedPlay.fields.channel.title'), message.member.voiceChannel.name, true)
                        .addField(t('comandos:play.embedPlay.fields.owner.title'), music.owner, true)
                        .addField(t('comandos:play.embedPlay.fields.likes.title'), Number(music.likeCount).toLocaleString(), true)
                        .addField(t('comandos:play.embedPlay.fields.dislikes.title'), Number(music.dislikeCount).toLocaleString(), true)
                        .addField(t('comandos:play.embedPlay.fields.views.title'), Number(music.views).toLocaleString(), true)
                        .addField(t('comandos:play.embedPlay.fields.duration.title'), (horas < 10 ? '0' + horas : horas) + ':' + (minutos2 < 10 ? '0' + minutos2 : minutos2) + ':' + (segundos < 10 ? '0' + segundos : segundos), true)
                        .addField(':loudspeaker: Link:', t('comandos:play.embedPlay.fields.link.value', { url: music.url }), true)
                    message.channel.send(embedPM);
                    musicas.queue.get(message.guild.id).som.titulo.push(music.title)
                    musicas.queue.get(message.guild.id).som.time.push(music.duration)
                    musicas.queue.get(message.guild.id).som.id.push(musicaID)
                    musicas.queue.get(message.guild.id).som.por.push(message.author.id)
                    play(musicaID)
                })
            } else {
                info(musicaID, (erro, music) => {
                    message.channel.send(t('comandos:play.addedMusic', { music: music.title, member: message.author }))
                    musicas.queue.get(message.guild.id).som.titulo.push(music.title)
                    musicas.queue.get(message.guild.id).som.time.push(music.duration)
                    musicas.queue.get(message.guild.id).som.id.push(musicaID)
                    musicas.queue.get(message.guild.id).som.por.push(message.author.id)
                })
            }
        } else {
            key.getPlaylist(razaou).then((playlist) => {
                playlist.getVideos().then(videos => {
                    message.channel.startTyping()
                    videos.forEach(addplay => {
                        if (!musicas.queue.get(message.guild.id).som[0]) {
                            musicas.queue.get(message.guild.id).som.id.push(addplay.id)
                            musicas.queue.get(message.guild.id).som.titulo.push(addplay.title)
                            musicas.queue.get(message.guild.id).som.time.push(addplay.duration)
                            musicas.queue.get(message.guild.id).som.por.push(message.author.id)
                            play(addplay.id)
                        } else {
                            musicas.queue.get(message.guild.id).som.id.push(addplay.id)
                            musicas.queue.get(message.guild.id).som.titulo.push(addplay.title)
                            musicas.queue.get(message.guild.id).som.time.push(addplay.duration)
                            musicas.queue.get(message.guild.id).som.por.push(message.author.id)
                        }
                    })
                    message.channel.stopTyping()
                    message.channel.send(t('comandos:play.addedPlaylist', { playlistLength: videos.length }))
                })
            }).catch(a => {
                message.channel.send(t('comandos:play.invalidPlaylist'))
            })
        }
    }

    async function play(music1) {
        musica2 = await musicas.queue.get(message.guild.id).channel.playStream(ytdl(music1, {
            filter: 'audioonly'
        }), {
            volume: 0.5,
            passes: 3
        })
        musicas.queue.get(message.guild.id).connection = musica2

        await musicas.queue.get(message.guild.id).connection.on('end', function(reason) {

            if (reason !== null) {
                if (!musicas.queue.get(message.guild.id).restart) {
                    if (musicas.queue.get(message.guild.id).repetir === 0) {
                        musicas.queue.get(message.guild.id).som.por.splice(musicas.queue.get(message.guild.id).atual, 1)
                        musicas.queue.get(message.guild.id).som.id.splice(musicas.queue.get(message.guild.id).atual, 1)
                        musicas.queue.get(message.guild.id).som.titulo.splice(musicas.queue.get(message.guild.id).atual, 1)
                        musicas.queue.get(message.guild.id).som.time.splice(musicas.queue.get(message.guild.id).atual, 1)
                        musicas.queue.get(message.guild.id).atual = 0
                        if (musicas.queue.get(message.guild.id).som.id[0]) {
                            play('https://www.youtube.com/watch?v=' + musicas.queue.get(message.guild.id).som.id[0])
                            musicas.queue.get(message.guild.id).inicio = new Date()
                            message.channel.send(t('comandos:play.playing', { music: musicas.queue.get(message.guild.id).som.titulo[0] }));
                        } else {
                            client.guilds.get(musicas.queue.get(message.guild.id).guild).channels.get(musicas.queue.get(message.guild.id).canal).send(t('comandos:play.endPlaylist'))
                            musicas.queue.get(message.guild.id).channel.disconnect()
                            musicas.queue.delete(message.guild.id)
                        }
                    } else if (musicas.queue.get(message.guild.id).repetir === 1) {
                        play('https://www.youtube.com/watch?v=' + musicas.queue.get(message.guild.id).som.id[musicas.queue.get(message.guild.id).atual])
                        musicas.queue.get(message.guild.id).inicio = new Date()
                        message.channel.send(t('comandos:play.playing', { music: musicas.queue.get(message.guild.id).som.titulo[musicas.queue.get(message.guild.id).atual] }));
                    } else if (musicas.queue.get(message.guild.id).repetir === 2) {
                        musicas.queue.get(message.guild.id).atual = musicas.queue.get(message.guild.id).atual + 1 === musicas.queue.get(message.guild.id).som.titulo.length ? 0 : musicas.queue.get(message.guild.id).atual + 1
                        message.channel.send(t('comandos:play.playing', { music: musicas.queue.get(message.guild.id).som.titulo[musicas.queue.get(message.guild.id).atual] }));
                        play('https://www.youtube.com/watch?v=' + musicas.queue.get(message.guild.id).som.id[musicas.queue.get(message.guild.id).atual])
                        musicas.queue.get(message.guild.id).inicio = new Date()
                    }
                } else {
                    play('https://www.youtube.com/watch?v=' + musicas.queue.get(message.guild.id).som.id[musicas.queue.get(message.guild.id).atual])
                    musicas.queue.get(message.guild.id).inicio = new Date()
                    message.channel.send(t('comandos:play.playing', { music: musicas.queue.get(message.guild.id).som.titulo[musicas.queue.get(message.guild.id).atual] }));
                }
            } else {
                play('https://www.youtube.com/watch?v=' + musicas.queue.get(message.guild.id).som.id[0])
                musicas.queue.get(message.guild.id).inicio = new Date()
            }

        })
    }

}