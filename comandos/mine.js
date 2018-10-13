var database = require('../database.js')
const request = require('request')

exports.run = ({ client, message, args, lang, language }, t) => {
  let razaou = args.slice(0).join(' ')
  let razaod = args.slice(1).join(' ')

  database.Guilds.findOne({
    '_id': message.guild.id
  }, function (servro, servidor) {
    if (servidor) {
      if (!razaou.length < 1) {
        if (message.content.startsWith(servidor.prefix + 'mine face')) {
          if (!razaod.length < 1) {
            message.channel.sendMessage({
              'embed': {
                'description': `<:minecraft:467468061302325259> **${args[1]}:**`,
                'color': 11676858,
                'timestamp': new Date(),
                'footer': {
                  'icon_url': message.author.displayAvatarURL,
                  'text': message.author.username
                },
                'image': {
                  'url': `https://mc-heads.net/avatar/${args[1]}`
                }
              }
            })
          } else {
            message.channel.sendMessage(':x: **Diga o nickname da skin.**')
          }
        } else if (message.content.startsWith(servidor.prefix + 'mine skin')) {
          if (!razaod.length < 1) {
            message.channel.sendMessage({
              'embed': {
                'description': `<:minecraft:467468061302325259> **${args[1]}:**`,
                'color': 11676858,
                'timestamp': new Date(),
                'footer': {
                  'icon_url': message.author.displayAvatarURL,
                  'text': message.author.username
                },
                'image': {
                  'url': `https://mc-heads.net/skin/${args[1]}`
                }
              }
            })
          } else {
            message.channel.sendMessage(':x: **Diga o nickname da skin.**')
          }
        } else if (message.content.startsWith(servidor.prefix + 'mine head')) {
          if (!razaod.length < 1) {
            message.channel.sendMessage({
              'embed': {
                'description': `<:minecraft:467468061302325259> **${args[1]}:**`,
                'color': 11676858,
                'timestamp': new Date(),
                'footer': {
                  'icon_url': message.author.displayAvatarURL,
                  'text': message.author.username
                },
                'image': {
                  'url': `https://mc-heads.net/head/${args[1]}`
                }
              }
            })
          } else {
            message.channel.sendMessage(':x: **Diga o nickname da skin.**')
          }
        } else if (message.content.startsWith(servidor.prefix + 'mine info')) {
          if (!razaod.length < 1) {
            try {
              request(`https://mc-heads.net/minecraft/profile/${args[1]}`, {
                json: true
              }, (err, res, body) => {
                request(`https://ss.gameapis.net/profile/${args[1]}`, {
                  json: true
                }, (err2, res2, body2) => {
                  if (err) {
                    return console.log(err)
                  }
                  if (err2) {
                    return console.log(err2)
                  }
                  if (body) {
                    if (body2) {
                      message.channel.sendMessage({
                        'embed': {
                          'color': 11676858,
                          'timestamp': new Date(),
                          'footer': {
                            'icon_url': message.author.displayAvatarURL,
                            'text': message.author.username
                          },
                          'thumbnail': {
                            'url': `https://mc-heads.net/avatar/${args[1]}`
                          },
                          'author': {
                            'name': body.name,
                            'icon_url': `https://mc-heads.net/head/${args[1]}`
                          },
                          'fields': [{
                            'name': ':busts_in_silhouette: Username:',
                            'value': body.name,
                            'inline': true
                          },
                          {
                            'name': '<:minecraftheart:467468253887856641> Skin:',
                            'value': `**[clique aqui](https://mc-heads.net/skin/${args[1]})**`,
                            'inline': true
                          },
                          {
                            'name': ':notepad_spiral: UUID:',
                            'value': body2.uuid_formatted,
                            'inline': true
                          },
                          {
                            'name': `:spy: Historico de nomes (${body.username_changes})`,
                            'value': '`' + body.username_history.map(a => `${a.name}`).join('` **|** `') + '`',
                            'inline': true
                          }
                          ]
                        }
                      })
                    } else {
                      message.channel.sendMessage(':x: **Usuário não encontrado.**')
                    }
                  } else {
                    message.channel.sendMessage(':x: **Usuário não encontrado.**')
                  }
                })
              })
            } catch (e) {
              message.channel.sendMessage(':x: **Usuário não encontrado.**')
            }
          } else {
            message.channel.sendMessage(':x: **Diga o nickname da conta.**')
          }
        } else if (message.content.startsWith(servidor.prefix + 'mine server')) {
          if (!razaod.length < 1) {
            try {
              request(`https://use.gameapis.net/mc/query/info/${args[1]}`, {
                json: true
              }, (err, res, body) => {
                if (err) {
                  return console.log(err)
                }

                if (body) {
                  if (body.status) {
                    message.channel.sendMessage({
                      'embed': {
                        'color': 11676858,
                        'timestamp': new Date(),
                        'footer': {
                          'icon_url': message.author.displayAvatarURL,
                          'text': message.author.username
                        },
                        'thumbnail': {
                          'url': `https://use.gameapis.net/mc/query/icon/${args[1]}`
                        },
                        'author': {
                          'name': `${body.hostname}`,
                          'icon_url': `https://use.gameapis.net/mc/query/icon/${args[1]}`
                        },
                        'fields': [{
                          'name': ':notepad_spiral: Server ip:',
                          'value': `${body.hostname}`,
                          'inline': true
                        },
                        {
                          'name': ':satellite_orbital: Ping:',
                          'value': `**${body.ping}** ms`,
                          'inline': true
                        },
                        {
                          'name': ':busts_in_silhouette: Players:',
                          'value': `${body.players.online}/${body.players.max}`,
                          'inline': true
                        },
                        {
                          'name': ':pushpin: Versão:',
                          'value': `**${body.version}**`,
                          'inline': true
                        },
                        {
                          'name': ':file_folder: MOTD:',
                          'value': `**${body.motds.clean}**`,
                          'inline': false
                        }
                        ]
                      }
                    })
                  } else {
                    message.channel.sendMessage(':x: **O servidor não existe ou não está online.**')
                  }
                } else {
                  message.channel.sendMessage(':x: **Servidor não encontrado.**')
                }
              })
            } catch (e) {
              message.channel.sendMessage(':x: **Servidor não encontrado.**')
            }
          } else {
            message.channel.sendMessage(':x: **Diga o ip do servidor.**')
          }
        } else {
          message.channel.sendMessage(':x: **Argumento inválido.**')
        }
      } else {
        message.channel.sendMessage({
          'embed': {
            'title': '<:minecraft:467468061302325259> Minecraft:',
            'description': `\`\`\`${servidor.prefix}mine face <nick | uuid>\n${servidor.prefix}mine head <nick | uuid>\n${servidor.prefix}mine skin <nick | uuid>\n${servidor.prefix}mine info <nick | uuid>\n${servidor.prefix}mine server <ip>\`\`\``,
            'color': 11676858,
            'timestamp': new Date(),
            'footer': {
              'icon_url': message.author.displayAvatarURL,
              'text': message.author.username
            },
            'thumbnail': {
              'url': 'https://cdn.discordapp.com/emojis/467468253887856641.png?v=1'
            }
          }
        })
      }
    } else {
      message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
    }
  })
}
