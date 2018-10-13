var database = require('../database.js')
const DBL = require('dblapi.js')
const os = require('os-utils')

exports.run = ({ client, message, args, lang, language }, t) => {
  var ping

  ping = parseInt(client.ping)

  const dbl = new DBL(process.env.dbl, client)

    var time
    String.prototype.toHHMMSS = function () {
      var sec_num = parseInt(this, 10)

      var hours = Math.floor(sec_num / 3600)
      var days = Math.floor(hours / 24)

      var minutes = Math.floor((sec_num - (hours * 3600)) / 60)

      var seconds = sec_num - (hours * 3600) - (minutes * 60)
      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      if (seconds < 10) {
        seconds = '0' + seconds
      }

      days > 1 ? time = '- **' + days + '** dias ' : time = time
      return '- **' + hours + '** horas\n- **' + minutes + '** minutos\n- **' + seconds + '** segundos'
    }

    client.shard.fetchClientValues('guilds.size').then(servidores => {
      client.shard.fetchClientValues('users.size').then(usuarios => {
        client.shard.fetchClientValues('channels.size').then(canais => {
          dbl.getBot(client.user.id).then(bot => {

            message.channel.sendMessage({
              'content': ':pencil: **Aqui estão algumas informações minhas:**',
              'embed': {
                'title': 'Info:',
                'description': `Olá, sou **Zhon**, um bot com várias funções com comandos moderação/utilitários/música/diversão/imagens.`,
                'color': 11676858,
                'timestamp': new Date(),
                'footer': {
                  'icon_url': message.author.displayAvatarURL,
                  'text': message.author.username
                },
                'thumbnail': {
                  'url': 'https://i.imgur.com/0DEF4PI.png'
                },
                'fields': [{
                  'name': ':books: Info:',
                  'value': `- **11.3.0** discord.js\n- **8.9.4** node.js\n- **${ping}** ms\n- **${(process.cpuUsage().user / 1024 / 1024 / 100).toFixed(2)}**% memória usada`,
                  'inline': true
                },
                {
                  'name': `:pencil: Status:`,
                  'value': `- **${servidores.reduce((prev, val) => prev + val, 0)}** guilds\n- **${usuarios.reduce((prev, val) => prev + val, 0)}** users\n- **${canais.reduce((prev, val) => prev + val, 0)}** channels\n- **${bot.points}** votos`,
                  'inline': true
                },
                {
                  'name': ':stopwatch: Uptime:',
                  'value': `${os.processUptime().toString().toHHMMSS()}`,
                  'inline': true
                },
                {
                  'name': ':diamond_shape_with_a_dot_inside: Links:',
                  'value': `- **[SERVIDOR](https://discord.gg/Jy3vtNE)**\n- **[CONVITE](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958591)**\n- **[DISCORD BOT LIST](https://discordbots.org/bot/${client.user.id})**`,
                  'inline': true
                }
                ]
              }
            })
          })
        }).catch(console.error)
      }).catch(console.error)
    }).catch(console.error)
}
