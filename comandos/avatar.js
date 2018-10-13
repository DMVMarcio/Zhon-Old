var database = require('../database.js')

exports.run = ({ client, message, args, lang, language }, t) => {
  let razaou = args.slice(0).join(' ')
  var usuario

  database.Guilds.findOne({
    '_id': message.guild.id
  }, function (servro, servidor) {
    if (servidor) {
      if (!razaou.length < 1) {
        if (message.mentions.users.size < 1) {
          if (client.users.get(args[0])) {
            usuario = client.users.get(args[0])
          } else if (client.users.find('tag', message.content.replace(`${servidor.prefix}avatar `, ''))) {
            usuario = client.users.find('tag', message.content.replace(`${servidor.prefix}avatar `, ''))
          } else if (message.guild.members.find('displayName', message.content.replace(`${servidor.prefix}avatar `, ''))) {
            usuario = message.guild.members.find('displayName', message.content.replace(`${servidor.prefix}avatar `, '')).user
          } else if (client.users.find('username', message.content.replace(`${servidor.prefix}avatar `, ''))) {
            usuario = client.users.find('username', message.content.replace(`${servidor.prefix}avatar `, ''))
          } else {
            usuario = message.author
          }
        } else {
          usuario = message.mentions.users.first()
        }
      } else {
        usuario = message.author
      }

      message.channel.sendMessage({
        'embed': {
          'description': t('comandos:avatar.userAvatar', {user: usuario.username}),
          'color': 11676858,
          'timestamp': new Date(),
          'footer': {
            'icon_url': message.author.displayAvatarURL,
            'text': message.author.username
          },
          'image': {
            'url': `${usuario.displayAvatarURL}`
          }
        }
      })
    } else {
      message.channel.sendMessage(':x: **Ocorreu um erro ao executar este comando.**')
    }
  })
}
