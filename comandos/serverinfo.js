var database = require('../database.js')
const moment = require('moment')
moment.locale('pt-BR')

exports.run = ({ client, message, args, lang, language }, t) => {
  database.Guilds.findOne({
    '_id': message.guild.id
  }, function (servro, servidor) {
    if (servidor) {
      var membros = message.guild.members.filter(m => m.user.bot === false).size
      var bots = message.guild.members.filter(m => m.user.bot).size
      var voz = message.guild.channels.filter(c => c.type === 'voice').size
      var texto = message.guild.channels.filter(c => c.type === 'text').size
      var criada = moment(message.guild.createdAt).format('lll')
      var entrei = moment(message.guild.members.get(client.user.id).joinedAt).format('lll')
      var cargos = message.guild.roles.map(r => r.name).join(', ')

      String.prototype.firstUpperLetter = function () {
        var target = this
        var arr = target.split('')
        arr[0] = arr[0].toUpperCase()
        var newStr = arr.join('')
        return newStr
      }

      message.channel.sendMessage({
        'embed': {
          'color': 11676858,
          'timestamp': new Date(),
          'footer': {
            'icon_url': message.author.displayAvatarURL,
            'text': message.author.username
          },
          'thumbnail': {
            'url': message.guild.iconURL
          },
          'author': {
            'name': message.guild.name,
            'icon_url': message.guild.iconURL
          },
          'fields': [
            {
              'name': ':crown: Dono:',
              'value': `${message.guild.owner}`,
              'inline': true
            },
            {
              'name': ':busts_in_silhouette: Membros:',
              'value': `${Number(membros).toLocaleString()}`,
              'inline': true
            },
            {
              'name': ':space_invader: Bots:',
              'value': `${Number(bots).toLocaleString()}`,
              'inline': true
            },
            {
              'name': ':earth_africa: Região:',
              'value': `${message.guild.region.firstUpperLetter()}`,
              'inline': true
            },
            {
              'name': ':page_facing_up: Canais de texto:',
              'value': `${texto}`,
              'inline': true
            },
            {
              'name': ':notes: Canais de voz:',
              'value': `${voz}`,
              'inline': true
            },
            {
              'name': ':calendar: Criada em:',
              'value': `${criada}`,
              'inline': true
            },
            {
              'name': ':calendar: Entrei aqui:',
              'value': `${entrei}`,
              'inline': true
            },
            {
              'name': `:crown: Cargos(${message.guild.roles.size}):`,
              'value': `\`\`\`\n${cargos.replace('@everyone, ', '')}\`\`\``,
              'inline': false
            }
          ]
        }
      })
    } else {
      message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
    }
  })
}
