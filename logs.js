const Discord = require('discord.js')
var database = require('./database.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  console.log('Logs iniciado!')

  client.on('channelCreate', channel => {
    if (channel.type !== 'dm') {
      database.Guilds.findOne({
        '_id': channel.guild.id
      }, function (servro, servidor) {
        if (servidor) {
          if (servidor.logs) {
            if (channel.guild.channels.get(servidor.logschannel)) {
              var canalLOGS = channel.guild.channels.get(servidor.logschannel)
              canalLOGS.sendMessage({
                'embed': {
                  'color': 11676858,
                  'timestamp': new Date(),
                  'footer': {
                    'icon_url': channel.guild.iconURL,
                    'text': channel.guild.name
                  },
                  'thumbnail': {
                    'url': channel.guild.iconURL
                  },
                  'author': {
                    'name': 'Canal criado:',
                    'icon_url': channel.guild.iconURL
                  },
                  'fields': [
                    {
                      'name': ':desktop: Nome:',
                      'value': channel.name,
                      'inline': true
                    },
                    {
                      'name': ':pencil: Tipo:',
                      'value': channel.type.replace('text', 'texto').replace('voice', 'voz'),
                      'inline': true
                    },
                    {
                      'name': ':tools: ID:',
                      'value': channel.id,
                      'inline': true
                    }
                  ]
                }
              }).catch(a => {
                servidor.logs = false
                servidor.logschannel = 'Nenhum'
                servidor.save()
              })
            } else {
              servidor.logs = false
              servidor.logschannel = 'Nenhum'
              servidor.save()
            }
          }
        }
      })
    }
  })

  client.on('channelDelete', channel => {
    if (channel.type !== 'dm') {
      database.Guilds.findOne({
        '_id': channel.guild.id
      }, function (servro, servidor) {
        if (servidor) {
          if (servidor.logs) {
            if (channel.guild.channels.get(servidor.logschannel)) {
              var canalLOGS = channel.guild.channels.get(servidor.logschannel)
              canalLOGS.sendMessage({
                'embed': {
                  'color': 11676858,
                  'timestamp': new Date(),
                  'footer': {
                    'icon_url': channel.guild.iconURL,
                    'text': channel.guild.name
                  },
                  'thumbnail': {
                    'url': channel.guild.iconURL
                  },
                  'author': {
                    'name': 'Canal deletado:',
                    'icon_url': channel.guild.iconURL
                  },
                  'fields': [
                    {
                      'name': ':desktop: Nome:',
                      'value': channel.name,
                      'inline': true
                    },
                    {
                      'name': ':pencil: Tipo:',
                      'value': channel.type.replace('text', 'texto').replace('voice', 'voz'),
                      'inline': true
                    },
                    {
                      'name': ':tools: ID:',
                      'value': channel.id,
                      'inline': true
                    }
                  ]
                }
              }).catch(a => {
                servidor.logs = false
                servidor.logschannel = 'Nenhum'
                servidor.save()
              })
            } else {
              servidor.logs = false
              servidor.logschannel = 'Nenhum'
              servidor.save()
            }
          }
        }
      })
    }
  })
}
