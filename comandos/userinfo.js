var database = require('../database.js')
const moment = require('moment')
require('moment-duration-format')
moment.locale('pt-BR')

exports.run = ({ client, message, args, lang, language }, t) => {
  let razaou = args.slice(0).join(' ')
  var usuario = !razaou.length < 1 ? message.mentions.users.size < 1 ? message.guild.members.get(args[0]) ? message.guild.members.get(args[0]) : message.guild.members.find('displayName', args.join(' ')) ? message.guild.members.find('displayName', args.join(' ')).user : message.author : message.mentions.users.first() : message.author

  database.Guilds.findOne({
    '_id': message.guild.id
  }, function (servro, servidor) {
    if (servidor) {

      database.Users.findOne({
        '_id': usuario.id
      }, function (erro, documento) {
        if (documento) {
          var unbug = 910 * documento.level + 1
          var tempo = moment.duration.format([moment.duration((parseInt(documento.timevip) + 43200000) - Date.now())], 'hh:mm:ss')
          var criado = moment(usuario.createdAt).format('lll')
          var entrou = moment(message.guild.members.get(usuario.id).joinedAt).format('lll')
          let jogando = usuario.presence.game ? usuario.presence.game.name : 'Nada'
          var status = usuario.presence.status
          let papel = documento.owner ? 'DONO(a)' : documento.subowner ? 'SUB-DONO(a)' : documento.dev ? 'DESENVOLVEDOR(a)' : documento.sup ? 'SUPERVISOR(a)' : documento.dzn ? 'DESIGNER' : documento.vip ? `VIP (${tempo} restantes)` : 'MEMBRO'
          var cargos = message.guild.members.get(usuario.id).roles.map(g => g.name).join(', ')
          let servidores = client.guilds.filter(a => a.members.get(usuario.id))
          servidores = servidores.map(a => a.name).join(', ')

          message.channel.sendMessage({
            'embed': {
              'color': 11676858,
              'timestamp': new Date(),
              'footer': {
                'icon_url': message.author.displayAvatarURL,
                'text': message.author.username
              },
              'thumbnail': {
                'url': usuario.displayAvatarURL
              },
              'author': {
                'name': usuario.username,
                'icon_url': usuario.displayAvatarURL
              },
              'fields': [{
                'name': ':busts_in_silhouette: Level:',
                'value': `**${documento.level}** (${documento.xp}/${unbug})`,
                'inline': true
              },
              {
                'name': ':money_with_wings: Coins:',
                'value': `${Number(documento.coins).toLocaleString()}`,
                'inline': true
              },
              {
                'name': ':page_facing_up: Papel no bot:',
                'value': `**${papel}**`,
                'inline': true
              },
              {
                'name': ':gift: Caixas:',
                'value': `${(documento.caixas.length)}`,
                'inline': true
              },
              {
                'name': ':briefcase: Reputação:',
                'value': `**${(documento.rep)} reps**`,
                'inline': true
              },
              {
                'name': ':frame_photo: Foto de perfil:',
                'value': `**[clique aqui](${usuario.displayAvatarURL})**`,
                'inline': true
              },
              {
                'name': ':calendar: Conta criada em:',
                'value': `${criado}`,
                'inline': true
              },
              {
                'name': ':calendar: Entrou aqui em:',
                'value': `${entrou}`,
                'inline': true
              },
              {
                'name': ':space_invader: Jogando:',
                'value': `${jogando}`,
                'inline': true
              },
              {
                'name': ':bell: Status:',
                'value': `${status.replace('dnd', 'Ocupado').replace('idle', 'Ausente').replace('online', 'Online').replace('offline', 'Offline')}`,
                'inline': true
              },
              {
                'name': ':crown: Cargos:',
                'value': `\`\`\`\n${cargos.replace('@everyone, ', '')}\`\`\``,
                'inline': false
              },
              {
                'name': `:earth_africa: Servidores em comum [Shard ${(client.shard.id + 1)}/${(client.shard.count)}]:`,
                'value': `\`\`\`\n${servidores}\`\`\``,
                'inline': false
              }
              ]
            }
          })
        } else {
          message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
        }
      })
    } else {
      message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
    }
  })
}
