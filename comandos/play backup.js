var numero = 0
var ytdl = require('ytdl-core')
var info = require('youtube-info')
var Api = require('simple-youtube-api')
var config
var musicas = require('../queue.js')
var musica2
var escolhendo = []
var key = new Api(process.env.youtube)

exports.run = ({ client, message, args, lang, language }, t) => {
  let razaou = args.slice(0).join(' ').trim()
  var playlist = 'false'
  var musica = ''

  if (!escolhendo.includes(message.author.id)) {
    if (message.member.voiceChannel) {
      if (!razaou.length < 1) {
        if (razaou != '#') {
          if (args[0].startsWith('https://www.youtube.com/watch?v=') || args[0].startsWith('http://youtu.be/')) {
            playlist = false
            musica = args[0].startsWith('https://www.youtube.com/watch?v=') ? args[0].replace('https://www.youtube.com/watch?v=', '') : args[0].replace('http://youtu.be/', '')
            key.searchVideos(musica.replace('#', ''), 10).then((encontrados) => {
              var resultados = encontrados.length > 9 ? 10 : encontrados.length === 0 ? 0 : encontrados
              if (resultados > 0) {
                tocar()
              } else {
                message.channel.sendMessage(':x: **Link inválido.**')
              }
            })
          } else if (args[0].startsWith('https://www.youtube.com/playlist?list=')) {
            playlist = true
            tocar()
          } else {
            playlist = false
            key.searchVideos(razaou.replace('#', ''), 10).then((encontrados) => {
              var resultados = encontrados.length > 9 ? 10 : encontrados.length === 0 ? 0 : encontrados.length
              if (resultados > 0) {
                message.channel.sendMessage({
                  'embed': {
                    'title': `:notes: Resultados para ${razaou}:`,
                    'description': `${encontrados.map(musica => `**${++numero}** - ${musica.title}`).join('\n')}\n\nDigite o **número** da música que deseja escutar.`,
                    'color': 11676858,
                    'timestamp': new Date(),
                    'footer': {
                      'icon_url': message.author.displayAvatarURL,
                      'text': message.author.username
                    },
                    'thumbnail': {
                      'url': 'https://i.imgur.com/0DEF4PI.png'
                    }
                  }
                }).then((value) => {
                  setTimeout(() => {
                    value.delete()
                  }, 15000)
                })

                escolhendo.unshift(message.author.id)
                setTimeout(function () {
                  escolhendo.splice(escolhendo.indexOf(message.author.id), 1)
                }, 15 * 1000)

                numero = 0

                message.channel.awaitMessages(message1 => message1.content > 0 && message1.content <= resultados && message1.author.id === message.author.id, {
                  maxMatches: 1,
                  time: 15000,
                  errors: ['time']
                }).then((coletado) => {
                  musica = encontrados[Number(coletado.first().content) - 1].id
                  escolhendo.splice(escolhendo.indexOf(message.author.id), 1)
                  tocar()
                }, function (err) {
                  escolhendo.splice(escolhendo.indexOf(message.author.id), 1)
                  message.channel.sendMessage(':x: **Seu tempo esgotou.**')
                })
              } else {
                message.channel.sendMessage(`:x: **Não encontrei resultados para \`${razaou}\`.**`)
              }
            })
          }
        } else {
          message.channel.sendMessage(':x: **Diga o nome da música ou mande o link de uma música/playlist no youtube.**')
        }
      } else {
        message.channel.sendMessage(':x: **Diga o nome da música ou mande o link de uma música/playlist no youtube.**')
      }
    } else {
      message.channel.sendMessage(':x: **Você não está em nenhum canal de voz.**')
    }
  } else {
    message.channel.sendMessage(':x: **Você já está selecionando uma música.**')
  }

  async function tocar () {
    if (message.member.voiceChannel.permissionsFor(client.user.id).has('SPEAK')) {
      if (message.guild.me.voiceChannel) {
        if (message.guild.me.voiceChannel.id === message.member.voiceChannel.id) {
          message.guild.me.voiceChannel.leave()
          message.member.voiceChannel.join().then(canal => {
            if (musicas.queue.get(message.guild.id) === null) {
              config = {
                guild: message.guild.id,
                channel: canal,
                repetir: 'não',
                atual: 0,
                canal: message.channel.id,
                atividade: 'tocando',
                som: {
                  titulo: [],
                  id: [],
                  por: []
                },
                connection: null
              }
              musicas.queue.set(message.guild.id, config)
            }
            tocar2()
          }).catch(a => {
            message.channel.sendMessage(':x: **Parece que ocorreu um erro ao executar este comando, verifique seu possuo a permissão `MOVER MEMBROS`.**')
          })
        } else {
          if (!musicas.queue.get(message.guild.id)) {
            message.member.voiceChannel.join().then(canal => {
              config = {
                guild: message.guild.id,
                channel: canal,
                repetir: 'não',
                atual: 0,
                canal: message.channel.id,
                atividade: 'tocando',
                som: {
                  titulo: [],
                  id: [],
                  por: []
                },
                connection: null
              }
              musicas.queue.set(message.guild.id, config)
              tocar2()
            }).catch(a => {
              message.channel.sendMessage('**:thinking: Não consegui executar esse comando. Verifique se posso me conectar ou se o canal está lotado.**')
            })
          } else {
            message.channel.sendMessage(':x: **Você não está no mesmo canal em que estou tocando, tente usar `z!summon`.**')
          }
        }
      } else {
        message.member.voiceChannel.join().then(canal => {
          if (musicas.queue.get(message.guild.id) === null) {
            config = {
              guild: message.guild.id,
              channel: canal,
              repetir: 'não',
              atual: 0,
              canal: message.channel.id,
              atividade: 'tocando',
              som: {
                titulo: [],
                id: [],
                por: []
              },
              connection: null
            }
            musicas.queue.set(message.guild.id, config)
            tocar2()
          }
        }).catch(a => {
          message.channel.sendMessage('**:thinking: Não consegui executar esse comando. Verifique se posso me conectar ou se o canal está lotado.**')
        })
      }
    } else {
      message.channel.sendMessage(`:x: **Não tenho permissão para falar no canal \`${message.member.voiceChannel.name}\`.**`)
    }

    async function tocar2 () {
      if (!playlist) {
        if (!musicas.queue.get(message.guild.id).som.id[0]) {
          info(musica, (erro, music) => {
            let tempo = Math.floor(music.duration)
            let horas
            let minutos
            let minutos2
            let segundos
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
            message.channel.sendMessage({
              'embed': {
                'title': `:tada: ${music.title}`,
                'color': 11676858,
                'timestamp': new Date(),
                'footer': {
                  'icon_url': message.author.displayAvatarURL,
                  'text': message.author.username
                },
                'image': {
                  'url': music.thumbnailUrl
                },
                'fields': [{
                  'name': ':notes: Canal:',
                  'value': message.member.voiceChannel.name,
                  'inline': true
                },
                {
                  'name': ':crown: Publicado por:',
                  'value': music.owner,
                  'inline': true
                },
                {
                  'name': ':thumbsup: Likes:',
                  'value': Number(music.likeCount).toLocaleString(),
                  'inline': true
                },
                {
                  'name': ':thumbsdown: Deslikes:',
                  'value': Number(music.dislikeCount).toLocaleString(),
                  'inline': true
                },
                {
                  'name': ':headphones: Views:',
                  'value': Number(music.views).toLocaleString(),
                  'inline': true
                },
                {
                  'name': ':alarm_clock: Duração:',
                  'value': (horas < 10 ? '0' + horas : horas) + ':' + (minutos2 < 10 ? '0' + minutos2 : minutos2) + ':' + (segundos < 10 ? '0' + segundos : segundos),
                  'inline': true
                },
                {
                  'name': ':loudspeaker: Link:',
                  'value': `**[clique aqui](${music.url})**`,
                  'inline': true
                }
                ]
              }
            })
            musicas.queue.get(message.guild.id).som.titulo.push(music.title)
            musicas.queue.get(message.guild.id).som.id.push(musica)
            musicas.queue.get(message.guild.id).som.por.push(message.author.id)
            play(musica)
          })
        } else {
          info(musica, (erro, music) => {
            message.channel.sendMessage(`:headphones: A música **${music.title}** foi adicionada à playlist por ${message.author}.`)
            musicas.queue.get(message.guild.id).som.titulo.push(music.title)
            musicas.queue.get(message.guild.id).som.id.push(musica)
            musicas.queue.get(message.guild.id).som.por.push(message.author.id)
          })
        }
      } else {
        key.getPlaylist(razaou).then((playlist) => {
          playlist.getVideos().then(sucesso => {
            message.channel.startTyping()
            for (var i = 0; sucesso[i]; i++) {
              if (!musicas.queue.get(message.guild.id).som[0]) {
                musicas.queue.get(message.guild.id).som.id.push(sucesso[i].id)
                musicas.queue.get(message.guild.id).som.titulo.push(sucesso[i].title)
                musicas.queue.get(message.guild.id).som.por.push(message.author.id)
                play(sucesso[i].id)
              } else {
                musicas.queue.get(message.guild.id).som.id.push(sucesso[i].id)
                musicas.queue.get(message.guild.id).som.titulo.push(sucesso[i].title)
                musicas.queue.get(message.guild.id).som.por.push(message.author.id)
              }
            }
            message.channel.stopTyping()
            message.channel.sendMessage(':notes: **Músicas da playlist adicionadas.**')
          })
        }).catch(a => {
          message.channel.sendMessage(':x: **Playlist inexistente.**')
        })
      }

      async function play (music1) {
        musica2 = await musicas.queue.get(message.guild.id).channel.playStream(ytdl(music1, {
          filter: 'audioonly'
        }), {
          volume: 0.5,
          passes: 3
        })
        musicas.queue.get(message.guild.id).connection = musica2

        await musicas.queue.get(message.guild.id).connection.on('end', function (reason) {
          if (reason === null) {
            play('https://www.youtube.com/watch?v=' + musicas.queue.get(message.guild.id).som.id[0])
          } else {
            musicas.queue.get(message.guild.id).som.por.splice(musicas.queue.get(message.guild.id).atual, 1)
            musicas.queue.get(message.guild.id).som.id.splice(musicas.queue.get(message.guild.id).atual, 1)
            musicas.queue.get(message.guild.id).som.titulo.splice(musicas.queue.get(message.guild.id).atual, 1)
            musicas.queue.get(message.guild.id).atual = 0
            if (musicas.queue.get(message.guild.id).som.id[0]) {
              play('https://www.youtube.com/watch?v=' + musicas.queue.get(message.guild.id).som.id[0])
              message.channel.sendMessage(':notes: **Tocando agora:** ' + musicas.queue.get(message.guild.id).som.titulo[0])
            } else {
              client.guilds.get(musicas.queue.get(message.guild.id).guild).channels.get(musicas.queue.get(message.guild.id).canal).sendMessage(':disappointed_relieved: **Playlist de músicas acabou.**')
              musicas.queue.get(message.guild.id).channel.disconnect()
              musicas.queue.delete(message.guild.id)
            }
          }
        })
      }
    }
  }
}
